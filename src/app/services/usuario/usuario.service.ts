import { Injectable } from '@angular/core';
import { ServiceModule } from '../service.module';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: ServiceModule
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router, public _subirArchivo: SubirArchivoService) {
    this.cargarStorage();
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }

  }

  estaLogado() {
    return (this.token.length > 5) ? true : false;
  }


  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
      .pipe(map( (resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }));
  }
  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }
  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token}).pipe(map( (resp: any) => {
      this.guardarStorage(resp.id, resp.token, resp.usuario);
    }));
  }

  login(usuario: Usuario, recordar: boolean = false) {
    const url = URL_SERVICIOS + '/login';

  if (recordar) {
    localStorage.setItem('email', usuario.email);
  } else {
    localStorage.removeItem('email');
  }

    return this.http.post( url, usuario ).pipe(map( (resp: any) => {
      this.guardarStorage( resp.id, resp.token, resp.usuario);
    }));
  }

  actualizarUsuario(usuario: Usuario) {
   let url = URL_SERVICIOS + '/usuario/' + usuario._id;
   url += '?token=' + this.token;

   return this.http.put( url, usuario )
     .pipe(map( (resp: any) => {
       this.guardarStorage(resp.usuario._id, this.token, usuario);
      swal('Usuario actualizado', usuario.nombre, 'success');

      return true;
    }));

  }

  cambiarImagen( archivo: File, id: string) {
    this._subirArchivo.subirArchivo(archivo, 'usuarios', id)
    .then( (resp: any) => {
      this.usuario.img = resp.usuario.img;
      swal('Imagen actualizada', this.usuario.nombre, 'success');

      this.guardarStorage(id, this.token, this.usuario);
    })
    .catch( resp => {
      console.log(resp);
    });
  }
}
