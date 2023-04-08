import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  storageForEdit: any;

  constructor(private http: HttpClient) {}
  getTaskData() {
    // return  this.http.get(environment.apiUrl + 'storage')

    return of([
      {
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
    ]);
  }

  getStorageData() {
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
  getStorageDataForEdit() {
    return of([this.storageForEdit]);
  }
  getStorageDetail() {
    return of([
      {
        vin: 12341223,
        model: 'GMC',
        color: 'blue',
        arrival_date: '18/8/2023',
      },
      {
        vin: 12344754568,
        model: 'GMC',
        color: 'Black',
        arrival_date: '18/8/2023',
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
  getUserData() {
    return of([
      {
        user_id: 0,
        name: 'Nada',
        email: 'nada@gmail.com',
        phone: '547030370053',
        role: 'Admin',
        branch: 'Safa',
        status: 'Active',
      },
    ]);
  }
  createUser(data) {
    // return this.http.post(environment.apiUrl + 'user/create' ,data)

    return of({
      user_id: 0,
    });
  }
  createTask(data) {
    // return this.http.post(environment.apiUrl + 'tasks/create' ,data)

    return of({
      task_id: 1234,
    });
  }

  createRoutine(data) {
    // return this.http.post(environment.apiUrl + 'routine/create' ,data)

    return of({
      routine_id: 1234,
    });
  }

  createStorage(data) {
    //  return this.http.post(environment.apiUrl+'storage/create' , data);

    return of({
      strg_id: '1234',
    });
  }

  editStorage(data) {
    // return this.http.post(environment.apiUrl + 'storage/edit', data);

    return of({
      strg_id: '1234',
      status: 'ok',
    });
  }

  deleteStorage(data) {
    // return this.http.delete(environment.apiUrl + 'storage/delete', data);

    return of({
      status: 'ok',
    });
  }

  onEditStorage(data) {
    this.storageForEdit = data;
  }
}
