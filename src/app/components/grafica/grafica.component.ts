import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styles: []
})
export class GraficaComponent implements OnInit {

  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  // tslint:disable-next-line:no-inferrable-types
  public doughnutChartType: string = '';
  // tslint:disable-next-line:no-inferrable-types
  leyenda: string = '';

  @Input() grafica: any = {};

  constructor() { }

  ngOnInit() {
    this.doughnutChartData = this.grafica.data;
    this.doughnutChartLabels = this.grafica.labels;
    this.doughnutChartType = this.grafica.type;
    this.leyenda = this.grafica.leyenda;
  }

}
