import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../interfaces/interfaces';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private baseUrl: string = environment.baseUrl;
private _user?: User;

get user (){
  return {...this._user};
}
  constructor(
    private http:HttpClient
  ) { }
  register( email: string,name:string, password: string){
    const url = `${this.baseUrl}/auth/new`;
    const body = { email,name, password }
    return this.http.post<AuthResponse>( url,body)
    .pipe(// el orden de los operadores es importante en cascada
      tap( ({ok, token}) => { // obj de tab, antes de llegr al login tener reestablecida  la infor del usuario
         if(ok){
          localStorage.setItem('token', token);

         }
      }

      ),
      map (res => res.ok),
      // catchError(err => of(false)) // atrapamos el error 400 y devomos suscribe false
       catchError(err => of(err.error.msg)) // atrapamos el error 400 y devomos suscribe false
    )
  }
  login( email: string, password: string){

    const url = `${this.baseUrl}/auth`;
    const body = { email, password }

    return this.http.post<AuthResponse>( url,body)
    .pipe(// el orden de los operadores es importante en cascada
      tap( res => { // obj de tab, antes de llegr al login tener reestablecida  la infor del usuario
         if(res.ok){
          localStorage.setItem('token',res.token);
          //  this._user ={
          //   name: res.name,
          //   uid: res.uid
          //  }
         }
      }

      ),
      map (res => res.ok),
      // catchError(err => of(false)) // atrapamos el error 400 y devomos suscribe false
       catchError(err => of(err.error.msg)) // atrapamos el error 400 y devomos suscribe false
    )

  }
validateToken(): Observable<boolean>{
  const url = `${this.baseUrl}/auth/renew`;
  const headers = new HttpHeaders()
        .set('x-token', localStorage.getItem('token') || '' )

  return this.http.get<AuthResponse>(url,{headers})
        .pipe(
          map(res => { // si es verdadero
            console.log(res.token);
            localStorage.setItem('token',res.token);
           this._user ={
            name: res.name,
            uid: res.uid,
            email: res.email
           }

            return res.ok;
          }),
          catchError( err => of(false))
        );
}
logout(){
  localStorage.clear();
}



}
