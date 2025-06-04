import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/authentification.service';

// Interface zur Typdefinition der Login-Response
interface Response {
  access_token: string;
}
@Component({
  selector: 'bs-login',
  imports: [
    ReactiveFormsModule // Modul für reaktive Formulare (FormGroup, FormBuilder, etc.)
  ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit {

  // Das Login-Formular mit den Feldern „username“ und „password“
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthenticationService,
              private toastr: ToastrService) {
    this.loginForm = this.fb.group({});
  }

  // Lifecycle-Hook: Initialisiert das Formular mit Validierungsvorgaben
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    });
  }

  // Wird beim Absenden des Login-Formulars aufgerufen.
  login() {
    const val = this.loginForm.value;
    this.authService.login(val.username, val.password).subscribe({
      next: (res) => {
        console.log(res);
        this.authService.setSessionStorage(res.access_token, res.user); // Token & Benutzer speichern
        this.router.navigate(['/']);
      },
      error: () => {
        this.toastr.error('Logindaten inkorrekt!', "TutOrganizer");
      }
    });
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
