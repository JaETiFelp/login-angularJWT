import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent  {
miFormulario: FormGroup = this.fb.group ({
  name : ['jeft',[Validators.required]],
  email : ['jetf@gmail.com',[Validators.required, Validators.email]],
  password : ['123456',[ Validators.required, Validators.minLength(6)]],

});
  constructor(
     private fb: FormBuilder,
     private router: Router,
     private authService:AuthService
    ) { }

register(){

  const { email,name, password } = this.miFormulario.value;

  this.authService.register( email,name, password )
  .subscribe( ok =>{
    //console.log(ok);
   if(ok == true){
     this.router.navigateByUrl('/dashboard');
   }else{
     //TODO: mostrar mensaje de error
     Swal
     .fire('Error,',ok,'error');
   }
 });
}

}
