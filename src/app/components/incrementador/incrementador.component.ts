import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
@ViewChild('txtProgress') txtProgress: ElementRef;
  // tslint:disable-next-line:no-inferrable-types
  @Input() progreso: number = 50;
  // tslint:disable-next-line:no-inferrable-types
  @Input() leyenda: string = 'Leyenda';

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onChange( newVal: number ) {

    if (newVal >= 100) {
      this.progreso = 100;
    } else if (newVal <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newVal;
    }
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);

  }
  cambiarValor(valor: number) {
    if (this.progreso + valor > 100 ) {
      return;
    }
    if ( this.progreso + valor < 0) {
      return;
    }
    this.progreso += valor;

    this.cambioValor.emit( this.progreso );
  }

}
