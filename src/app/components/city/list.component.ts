import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { CityService } from '@app/services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    cities = null;

    constructor(private cityService: CityService) {}

    ngOnInit() {
        this.cityService.getAll()
            .pipe(first())
            .subscribe(cities => this.cities = cities);
    }

    deleteCity(id: string) {
        const city = this.cities.find(x => x.id === id);
        city.isDeleting = true;
        this.cityService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.cities = this.cities.filter(x => x.id !== id);
            });
    }
}
