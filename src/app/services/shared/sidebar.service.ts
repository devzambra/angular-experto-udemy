import { ServiceModule } from './../service.module';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: ServiceModule
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Dashboard', url: '/dashboard'},
        {titulo: 'ProgressBar', url: '/progress'},
        {titulo: 'Gráficas', url: '/graficas1'},
      ]
    }
  ];

  constructor() { }
}
