import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { State } from '@app/models';

@Injectable({ providedIn: 'root' })
export class StateService {

    constructor(
        private http: HttpClient
    ) {
    }

    getAll() {
        return this.http.get<State[]>(`${environment.apiUrl}/api/state/`);
    }

    getById(id: string) {
        return this.http.get<State>(`${environment.apiUrl}/api/state/${id}`);
    }

    create(state: State) {
      return this.http.post(`${environment.apiUrl}/api/state/create`, state);
    }

    update(id, params) {
      return this.http.put(`${environment.apiUrl}/api/state/${id}`, params);
    }

      delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/api/state/${id}`);
    }
}
