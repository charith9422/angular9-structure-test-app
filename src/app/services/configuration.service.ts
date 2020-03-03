import { Injectable } from '@angular/core';
import endpoints from '../../assets/end-points.json';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor() { }

  apiEndpoints = {
    matchData:(<any>endpoints).matchData
  }
}
