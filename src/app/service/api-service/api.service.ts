import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // storage apis

  getStorageData() {
    return this.http.get(environment.apiUrl + 'storage');
  }

  getStorageDetailById(id) {
    return this.http.get(environment.apiUrl + 'storage/' + id + '/vehicles');
  }

  getVehiclesOfStorage(id) {
    return this.http.get(environment.apiUrl + 'storage/' + id + '/vehicles');
  }

  createStorage(data) {
    return this.http.post(environment.apiUrl + 'storage', data);
  }

  editStorage(data, id) {
    return this.http.put(environment.apiUrl + 'storage/' + id, data);
  }

  deleteStorage(data) {
    return this.http.delete(environment.apiUrl + 'storage/' + data);
  }

  // routine apis

  getRoutinesData() {
    return this.http.get(environment.apiUrl + 'routine');
  }
  createRoutine(data) {
    return this.http.post(environment.apiUrl + 'routine', data);
  }
  getRoutineData(id) {
    return this.http.get(environment.apiUrl + 'routine/' + id);
  }
  editRoutinData(data, id) {
    return this.http.put(environment.apiUrl + 'routine/' + id, data);
  }

  removeRoutinData(id) {
    return this.http.delete(environment.apiUrl + 'routine/' + id);
  }

  //task apis

  getTaskData() {
    return this.http.get(environment.apiUrl + 'task');
  }
  createTask(data) {
    return this.http.post(environment.apiUrl + 'task', data);
  }

  removeTaskData(id) {
    return this.http.delete(environment.apiUrl + 'task/' + id);
  }

  editTaskData(data, id) {
    return this.http.put(environment.apiUrl + 'task/' + id, data);
  }

  // user api

  getUserData() {
    return this.http.get(environment.apiUrl + 'user');
  }
  createUser(data) {
    return this.http.post(environment.apiUrl + 'user', data);
  }

  deleteUser(id) {
    return this.http.delete(environment.apiUrl + 'user/' + id);
  }
}
