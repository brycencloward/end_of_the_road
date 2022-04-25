import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { getAuth, deleteUser } from 'firebase/auth';
import { logout } from 'src/store/login/login.actions';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss'],
})
export class DeleteUserComponent implements OnInit {

  constructor(private router: Router, private store: Store<AppState>, public alertController: AlertController) { }

  async presentDeleteAlert() {
    const alert = await this.alertController.create({
      header: 'Delete Account',
      message: 'Are you sure you want to delete your account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Delete',
          id: 'delete-button',
          cssClass: 'danger',
          handler: () => {
            const auth = getAuth();
            const user = auth.currentUser;

            this.store.dispatch(logout());

            deleteUser(user).then(() => {
              console.log("User successfully deleted.");

              this.router.navigate(['login']);
            }).catch((error) => {
              console.log(error);
            });
            console.log('Confirm delete');
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {}
}
