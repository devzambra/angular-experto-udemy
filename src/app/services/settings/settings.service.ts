import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ServiceModule } from '../service.module';

@Injectable({
  providedIn: ServiceModule
})
export class SettingsService {

  ajustes: Ajustes = {
    themeUrl: 'assets/css/colors/default.css',
    theme: 'default'
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.theme);
    }
  }

  aplicarTema( tema: string) {
    const url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('theme').setAttribute('href', url);

    this.ajustes.theme = tema;
    this.ajustes.themeUrl = url;

    this.guardarAjustes();
  }
}



interface Ajustes {
  themeUrl: string;
  theme: string;
}
