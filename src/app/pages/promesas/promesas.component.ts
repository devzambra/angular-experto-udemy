import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.contarTres().then((msg) => {
      console.log('Termino', msg);
    })
    .catch( () => {
      console.log('Error');
    });
  }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    return new Promise( (resolve, reject )  => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;

        if (contador === 3) {
          clearInterval(intervalo);
          resolve(true);
        }
      }, 1000);
    });

  }

}
