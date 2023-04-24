import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  loginError: string;
  responseValue: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.userService.login(this.loginForm.value)
        .subscribe(
          data => {
            this.responseValue = data;
            if (this.responseValue.result !== 'error') {
              localStorage.setItem('currentUser', JSON.stringify(this.responseValue.value));
              this.router.navigate(['/']);
            } else {
              this.loginError = this.responseValue.message;
            }
          },
          error => {
            this.loginError = 'Something went wrong! Please try again later.';
            this.loading = false;
          });
    }

  }
}