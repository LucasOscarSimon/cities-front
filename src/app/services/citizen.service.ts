import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Citizen } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class CitizenService {

  constructor(
      private http: HttpClient
  )
  {
  }

  getAll() {
      return this.http.get<Citizen[]>(`${environment.apiUrl}/api/citizen/`);
  }

  getById(id: string) {
      return this.http.get<Citizen>(`${environment.apiUrl}/api/citizen/${id}`);
  }

  create(citizen: Citizen) {
    return this.http.post(`${environment.apiUrl}/api/citizen/create`, citizen);
  }

  update(id, params) {
    return this.http.put(`${environment.apiUrl}/api/citizen/${id}`, params);
  }

    delete(id: string) {
      return this.http.delete(`${environment.apiUrl}/api/citizen/${id}`);
  }
}
