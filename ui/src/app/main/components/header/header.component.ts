import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {logoutConfirmation} from '@app/auth/store/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private store: Store<void>) {
  }

  ngOnInit() {
  }

  onLogout() {
    this.store.dispatch(logoutConfirmation());
  }

}
