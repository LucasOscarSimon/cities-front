import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { StateService } from '@app/services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    states = null;

    constructor(private stateService: StateService) {}

    ngOnInit() {
        this.stateService.getAll()
            .pipe(first())
            .subscribe(states => this.states = states);
    }

    deleteState(id: string) {
        const state = this.states.find(x => x.id === id);
        state.isDeleting = true;
        this.stateService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.states = this.states.filter(x => x.id !== id);
            });
    }
}
