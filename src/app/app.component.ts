import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  SafeUrl,
} from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-expert-06';
  jwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  exp: Date;

  sanitizer = inject(DomSanitizer);

  safeHTML: SafeHtml;
  safeURL: SafeUrl;
  safeResourceURL: SafeResourceUrl;

  passwordForm: FormGroup;

  fb = inject(FormBuilder);

  constructor() {
    const jwtDecoded = jwtDecode<JWT>(this.jwt);
    const sub = jwtDecoded.sub;
    const name = jwtDecoded.name;
    const iat = jwtDecoded.iat;
    // exp = 1 minutes from now
    this.exp = new Date();
    this.exp.setMinutes(this.exp.getMinutes() + 1);
    console.log('JWT Decoded: ', jwtDecode(this.jwt));
    console.log('Sub: ', sub);
    console.log('Name: ', name);
    console.log('IAT: ', new Date(iat * 1000));
    console.log('EXP: ', this.exp);
    // setInterval(() => {
    //   this.checkToken();
    // }, 3000);

    const htmlMalicioso =
      '<h1>HTML Malicioso</h1><script>alert("XSS")</script>';
    this.safeHTML = this.sanitizer.bypassSecurityTrustHtml(htmlMalicioso);

    const urlMaliciosa = 'javascript:alert("XSS")';
    this.safeURL = this.sanitizer.bypassSecurityTrustUrl(urlMaliciosa);

    const recursoMalicioso = 'https://malicioso.com/iframe';
    this.safeResourceURL =
      this.sanitizer.bypassSecurityTrustResourceUrl(recursoMalicioso);

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, this.myPasswordValidator]],
    });
  }

  myPasswordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.value;
    if (!password) {
      return null;
    }

    const hasNumber = /\d/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
    const isValidLength = password.length >= 8;

    const passwordValid =
      hasNumber && hasUpper && hasLower && hasSpecial && isValidLength;

    if (!passwordValid) {
      return { invalidPassword: true };
    }

    return null;
  }

  isTokenExpired(token: string): boolean {
    const jwtDecoded = jwtDecode<JWT>(token);
    // Simulate token expiration
    const now = new Date();
    return this.exp < now;
  }

  checkToken() {
    const expired = this.isTokenExpired(this.jwt);
    if (expired) {
      //alert('Token expired');
    } else {
      console.log('Token is still valid');
    }
  }

  // SELECT * FROM users WHERE name = ""; DROP TABLE *; //" WHERE isDeleted = false;
  // "; DROP TABLE *; --
}

interface JWT {
  sub: string;
  name: string;
  iat: number;
}
