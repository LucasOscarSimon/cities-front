import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { CitizenService } from '@app/services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    citizens = null;

    constructor(private citizenService: CitizenService) {}

    ngOnInit() {
        this.citizenService.getAll()
            .pipe(first())
            .subscribe(citizens => this.citizens = citizens);
    }

    deleteCitizen(id: string) {
        const citizen = this.citizens.find(x => x.id === id);
        citizen.isDeleting = true;
        this.citizenService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.citizens = this.citizens.filter(x => x.id !== id);
            });
    }
}
