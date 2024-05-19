import { Component, inject } from '@angular/core';
import { AppUser } from '../auth-response';
import { AuthService } from '../auth.service';
import { PageSettingsModel } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  public UserList: AppUser[] = [];

  private service = inject(AuthService);

  public pageSettings: PageSettingsModel = { pageSize: 5 };

  ngOnInit() {
    this.LoadData();
  }


  LoadData() {
    this.service.users().subscribe((response: AppUser[]) => {
      this.UserList = response;
      //console.log(response);
    },
      (error) => {
        console.log('Observable emitted an error:' + error);

      });
  }
}
