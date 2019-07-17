import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Credentials} from '@app/models/account';
import {login} from '@app/store/actions/login.actions';
import * as fromAuth from '@app/store/reducers';

@Component({
  selector: 'app-start-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  show = false;

  pending$ = this.store.pipe(select(fromAuth.getLoginPagePending));
  error$ = this.store.pipe(select(fromAuth.getLoginPageError));

  constructor(private fb: FormBuilder,
              private store: Store<any>) {
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
    // this.store.dispatch(login({email: 'vadim.dynnik@gmail.com', password: 'secret'}));
    if (this.loginForm.valid) {
      const credentials: Credentials = {email: this.controls.email.value, password: this.controls.password.value};
      this.store.dispatch(login({credentials}));
    }
  }

  toggleShow(): void {
    this.show = !this.show;
  }

}
