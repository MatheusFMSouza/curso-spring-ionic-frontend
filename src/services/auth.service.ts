import { CartService } from './domain/cart.service';
import { StorageService } from './storage.service';
import { LocalUser } from './../models/local_user';
import { API_CONFIG } from "./../config/api.config";
import { CredenciasDTO } from "./../models/credenciais.dto";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelper } from 'angular2-jwt';


@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public http: HttpClient, public storage: StorageService, public cartService: CartService) {}

  authenticate(creds: CredenciasDTO) {
    return this.http.post(
      `
      ${API_CONFIG.baseURL}/login`,
      creds,
      {
        observe: "response",
        responseType: "text"
      }
    );
  }
  refreshToken() {
    return this.http.post(
      `${API_CONFIG.baseURL}/auth/refresh_token`,
      {},
      {
        observe: "response",
        responseType: "text"
      }
    );
  }

  sucessfullLogin(authorizationValue : string) {
    let tok = authorizationValue.substring(7);
    let user: LocalUser = {
      token: tok,
      email: this.jwtHelper.decodeToken(tok).sub
    };
    this.storage.setLocalUser(user);
    this.cartService.createOrClearCart();
  }

  logout() {
    this.storage.setLocalUser(null);
  }

}
