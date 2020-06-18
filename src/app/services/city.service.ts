import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { City } from '@app/models';

@Injectable({ providedIn: 'root' })
export class CityService {

    constructor(
        private http: HttpClient
    ) {
    }

    getAll() {
        return this.http.get<City[]>(`${environment.apiUrl}/api/city/`);
    }

    getById(id: string) {
        return this.http.get<City>(`${environment.apiUrl}/api/city/${id}`);
    }

    create(citizen: City) {
      return this.http.post(`${environment.apiUrl}/api/city/create`, citizen);
    }

    update(id, params) {
      return this.http.put(`${environment.apiUrl}/api/city/${id}`, params);
    }

      delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/api/city/${id}`);
    }
}
