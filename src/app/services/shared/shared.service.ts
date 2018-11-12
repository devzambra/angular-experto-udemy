import { ServiceModule } from './../service.module';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: ServiceModule
})
export class SharedService {

  constructor() { }
}
