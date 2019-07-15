import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {
  recoveryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.recoveryForm = this.fb.group({
      password1: ['', Validators.compose([Validators.required])],
      password2: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }

}
