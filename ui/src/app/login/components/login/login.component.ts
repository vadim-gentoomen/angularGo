import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Account} from '../../../models/account';

@Component({
  selector: 'app-start-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  account: Account = new Account();
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
  }

  get controls() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.controls);
      this.authService.login$(this.controls.email.value, this.controls.password.value)
        .pipe(first())
        .subscribe((data) => {
          console.log('!!!!', data);
          this.router.navigate(['/']);
        });

    }

  }

}
