import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {jwtDecode} from 'jwt-decode';
import {User} from './user';
import {tap} from 'rxjs/operators';

interface Token {
  exp: number;
  user : {
    id:string;
    name:string;
    email:string;
    role:string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor() {
    const userJson = sessionStorage.getItem("user");
    if(userJson) {
      this.user.set(JSON.parse(userJson));
    }
  }

  private api = "http://tutorganizer.s2210456031.student.kwmhgb.at/api/auth";

  isLoggedIn = signal(this.hasValidToken());
  user = signal<User | null>(null);

  http = inject(HttpClient);

  login(email: string, password: string) {
    return this.http.post<{access_token: string, user: User}>(`${this.api}/login`, {email, password})
      .pipe(tap(response => {
        this.setSessionStorage(response.access_token, response.user);
      })
    );
  }

  logout() {
    this.http.post(`${this.api}/logout`, {}).subscribe({
    next: () => {this.clearSession();},
    error: () => {this.clearSession();}
    });
  }

  private clearSession() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("user");
    this.isLoggedIn.set(false);
  }

  public hasValidToken(): boolean {
    if(sessionStorage.getItem("token")){
      let token: string = <string>sessionStorage.getItem("token");
      const decodedToken = jwtDecode(token) as Token;
      let expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if(expirationDate < new Date()) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("user");
        return false;
      }
      return true;
    }else {
      return false;
    }
  }

  public getCurrentUserId(): number {
    return Number.parseInt(<string>sessionStorage.getItem("userId") || "-1");
  }

  setSessionStorage(access_token: string, user: User) {
    console.log(jwtDecode(access_token));
    const decodedToken = jwtDecode(access_token) as Token;
    sessionStorage.setItem("token", access_token);
    sessionStorage.setItem("userId", decodedToken.user.id);

    this.user.set(user);
    this.isLoggedIn.set(true);
  }
}
