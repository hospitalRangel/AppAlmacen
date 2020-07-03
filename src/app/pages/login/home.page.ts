import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../shared/user.class';
import { MenuController, LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  user: User = new User();
  imagen2 = '../assets/error.png';

  constructor(
    private router: Router,
    private authSvc: AuthService,
    public menuCtrl: MenuController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  private esconderCarga(){
    this.loadingCtrl.dismiss();
  }

  async presentAlert(titulo: string, error: string){
    const alert = await this.alertCtrl.create({
      mode: 'ios',
      header: titulo,
      message: `<img src="${this.imagen2}">` + '<p>' + `${error}` + '</p>',
      buttons: ['OK']
    });
    await this.esconderCarga();
    await alert.present();
  }

  async onLogin() {
    const carga = await this.loadingCtrl.create({
      mode: 'ios',
      message: 'Iniciando sesión...',
      spinner: 'bubbles'
    });
    await carga.present();
    this.authSvc.onLogin(this.user).then(res => {
      this.router.navigate(['/entrada']);
      this.menuCtrl.enable(true);
      carga.dismiss();
    }).catch(err => this.presentAlert('ALERTA', err));
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
    // this.menuCtrl.toggle();
  }
}
