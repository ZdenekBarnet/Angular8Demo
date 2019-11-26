import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin = false;
  badLoginInfo = 'Nesprávné uživatelské jméno nebo heslo.';
  title = 'Přihlášení';
  user = 'Uživatel';
  password = 'Heslo';
  logIn = 'Přihlásit se';
  help = '(admin, admin)';
  userRequired = 'Vyplňte prosím uživatelské jméno';
  passRequired = 'Vyplňte prosím heslo';

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: LoginService) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const body = new HttpParams()
      .set('username', this.loginForm.controls.username.value)
      .set('password', this.loginForm.controls.password.value)
      .set('grant_type', 'password');

    this.apiService.login(body.toString()).subscribe(data => {
      window.sessionStorage.setItem('token', JSON.stringify(data));
      console.log(window.sessionStorage.getItem('token'));
      this.invalidLogin = false;
      this.router.navigate(['dash/customers']); // po přihlášení se zobrazí adresář kontaktů
    }, error => {
      this.invalidLogin = true; // zobrazí badLoginInfo
      // alert('Nesprávné uživatelské jméno nebo heslo.');
    });
  }

  ngOnInit() {
    window.sessionStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

}
