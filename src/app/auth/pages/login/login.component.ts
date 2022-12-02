import { Component } from '@angular/core';
import {FormBuilder,FormGroup,Validators  } from "@angular/forms";
import { Router } from '@angular/router';
import  Swal from 'sweetalert2'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'

})

export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
   email:    ['lolita@gmail.com', [ Validators.required, Validators.email ]] ,
   password: ['lolita', [ Validators.required, Validators.minLength(6)]]
  });
  constructor(
     private fb: FormBuilder,
     private router: Router,
     private authService: AuthService
     ) { }

  login(){

    console.log(this.miFormulario.value);
    const { email, password } = this.miFormulario.value;

    this.authService.login( email, password )
    .subscribe( ok =>{
       //console.log(ok);
      if(ok == true){
        this.router.navigateByUrl('/dashboard');
      }else{
        //TODO: mostrar mensaje de error
        Swal.fire('Error,',ok,'error');
      }
    });
  //   this.authService.validateToken()
  // .subscribe( console.log)

 }



}

