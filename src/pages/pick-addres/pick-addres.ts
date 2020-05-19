import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';
import { EnderecoDTO } from './../../models/EnderecoDTO';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pick-addres',
  templateUrl: 'pick-addres.html',
})
export class PickAddresPage {

  items: EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageService, public service:ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.service.findByEmail(localUser.email).subscribe(
        (response) => {
          this.items = response['enderecos'];
        },
        (error) => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        }
      );
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }


}
