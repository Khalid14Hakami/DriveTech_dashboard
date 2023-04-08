import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}
  getTaskData() {
    return of({
      request: 'GET /tasks/',
      request_payload: '',
      Response: [
        {
          task_id: 12,
          name: 'Windshield Wipers',
          type: 'check',
          repetition: '14 days',
        },
        {
          task_id: 13,
          name: 'Tire Pressure',
          type: 'measure',
          repetition: '14 days',
        },
      ],
    });
  }

  getData() {
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
  getRoutinData() {
    return of({
      request: 'GET routine/',
      request_payload: '',
      Response: [
        {
          routine_id: 12,
          name: 'General Car Check',
          model: 'GM_All',
        },
        {
          routine_id: 12,
          name: 'Elictric Car Check',
          model: 'GM_electric_All',
        },
      ],
    });
  }
}
