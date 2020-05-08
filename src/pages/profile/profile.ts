import { ClienteService } from "./../../services/domain/cliente.service";
import { StorageService } from "./../../services/storage.service";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ClienteDTO } from "../../models/Cliente.dto";
import { API_CONFIG } from "../../config/api.config";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html",
})
export class ProfilePage {
  cliente: ClienteDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public service: ClienteService
  ) {}

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.service.findByEmail(localUser.email).subscribe(
        (response) => {
          this.cliente = response;
          //buscar imagem do usuario no bucket
          this.getImageIfExists();
        },
        (error) => {}
      );
    }
  }
  getImageIfExists() {
    this.service.getImageFromBucket(this.cliente.id).subscribe(
      (response) => {
        this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
      },
      (error) => {}
    );
  }
}