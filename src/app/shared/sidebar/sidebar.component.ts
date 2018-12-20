import { SidebarService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public _sidebar: SidebarService, public _usuarioService: UsuarioService) { }

  ngOnInit() {
  }

}
