import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRequest } from '../auth-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  error!: string;
  model!: AuthRequest;
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  constructor() {
    this.model = new AuthRequest();
    // redirect to home if already logged in
    if (this.authService.userValue) {
      this.router.navigate(['/']);
    }
  }
  login(event: Event) {
    event.preventDefault();

    console.log(`Login: ${this.model.email} / ${this.model.password}`);

    this.authService
      .login(this.model)
      .subscribe(() => {
        //alert('Login success!');
        //window.location.href = '/';

        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        //this.router.navigateByUrl(returnUrl);

        window.location.href = returnUrl;
        /*this.router.navigate(['/']);*/
      }, (errRes) => {
        this.error = errRes.error;
      });
  }
}
