import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor() {}

  getStorageList() {
    return of([
      {
        strg_id: 1234,
        location: '123 st',
        name: 'safa',
        proponent: 'Ahmed',
        Phone: '054503450002',
      },
      {
        strg_id: 1234,
        location: '123 st',
        name: 'safa',
        proponent: 'Ahmed',
        Phone: '054503450002',
      },
    ]);
  }

  createStorage(data: any) {
    return of({
      strg_id: '1234',
    });
  }
}
