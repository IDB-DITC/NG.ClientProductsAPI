import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthRegRequest } from '../AuthRegRequest';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model!: AuthRegRequest;
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  constructor() {
    this.model = new AuthRegRequest();
    // redirect to home if already logged in
    if (this.authService.userValue) {
      this.router.navigate(['/']);
    }
  }
  submit(event: Event) {
    event.preventDefault();

    console.log(`Login: ${this.model.email} / ${this.model.password}`);

    this.authService
      .register(this.model)
      .subscribe(() => {
        //alert('Login success!');
        //window.location.href = '/';


        this.router.navigateByUrl('/login?returnUrl=' + this.route.snapshot.queryParams['returnUrl']);

        /*this.router.navigate(['/']);*/
      });
  }
}
