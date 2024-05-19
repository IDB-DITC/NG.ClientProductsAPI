import { Component, inject } from '@angular/core';
import { AppRole, AppUser } from '../auth-response';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assign-role',
  templateUrl: './assign-role.component.html',
  styleUrl: './assign-role.component.css'
})
export class AssignRoleComponent {
  model!: AppUser;

  public roles: AppRole[] = [];
  private service = inject(AuthService);
  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.service.roles().subscribe((response: AppRole[]) => {
      this.roles = response;
      //console.log(response);
    },
      (error) => {
        console.log('Observable emitted an error:' + error);

      });

    this.service.getUser(id).subscribe((response: AppUser) => {
      this.model = response;
      //console.log(response);
    },
      (error) => {
        console.log('Observable emitted an error:' + error);

      });


  }
  submit(event: Event) {
    event.preventDefault();

    alert(JSON.stringify(this.model));

    this.service.userAssignRole(this.model).subscribe((response: any) => {
      this.router.navigate(['/userlist']);
      //console.log(response);
    },
      (error) => {
        console.log('Observable emitted an error:' + error);

      });

  }
}
