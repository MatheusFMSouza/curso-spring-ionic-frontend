import { API_CONFIG } from "./../config/api.config";
import { CredenciasDTO } from "./../models/credenciais.dto";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService {
  constructor(public http: HttpClient) {}

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
}
