import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';


declare function init_plugins();
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recuerdame = false;
  email: string;
  auth2: any;

  constructor(public _router: Router, public _usuarioService: UsuarioService, public _ngZone: NgZone) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '431099739424-54bda7ko581s2lhpg115lqda895biajf.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn( document.getElementById('btnGoogle'));
    });
  }

  attachSignIn(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      // console.log(token);
      this._usuarioService.loginGoogle(token).subscribe( () => this._ngZone.run(() => this._router.navigate(['/dashboard'])));
    });
  }

  ingresar(forma: NgForm) {
    if (!forma.valid) {
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame).subscribe( correcto => this._router.navigate(['/dashboard']));
    // this._router.navigate(['/dashboard']);
  }

}
