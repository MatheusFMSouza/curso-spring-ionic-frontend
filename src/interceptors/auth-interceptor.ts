import { API_CONFIG } from './../config/api.config';
import { StorageService } from './../services/storage.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      let localUser = this.storage.getLocalUser();
      let n = API_CONFIG.baseURL.length;
      let requestToAPI = req.url.substring(0, n) == API_CONFIG.baseURL;
      if (localUser && requestToAPI) {
        const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bear ' + localUser.token) });
        return next.handle(authReq);
      } else {
        return next.handle(req);
      }

    }
}

export const AuhtInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};