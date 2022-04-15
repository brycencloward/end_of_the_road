import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { getAuth, deleteUser } from 'firebase/auth';
import { logout } from 'src/store/login/login.actions';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit {

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {}

  delete() {
    const auth = getAuth();
    const user = auth.currentUser;

    this.store.dispatch(logout());

    deleteUser(user).then(() => {
      console.log("User successfully deleted.");

      this.router.navigate(['login']);
    }).catch((error) => {
      console.log(error);
    });
  }
}
