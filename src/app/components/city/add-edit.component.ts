import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, CityService, StateService } from '@app/services';
import { State } from '@app/models';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    states: Array<State> = new Array();

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private stateService: StateService,
        private alertService: AlertService,
        private cityService: CityService
    ) {

    }

    ngOnInit() {
      this.id = this.route.snapshot.params.id;
      this.isAddMode = !this.id;
      this.stateService.getAll().pipe(first()).subscribe(states => this.states = states);


      if (!this.isAddMode) {

        this.mapCity();
      }
      this.buildForm();
    }

    mapCity(){
      this.cityService.getById(this.id)
      .pipe(first())
      .subscribe(x => {
          this.f.name.setValue(x.name);
          this.f.state.setValue(this.states.find(state => state.id === x.state.id));
      });
    }

    buildForm(){
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        state: ['', Validators.required],
      });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createCity();
        } else {
            this.updateCity();
        }
    }

    private createCity() {
        this.cityService.create(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('City added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['.', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    private updateCity() {
        this.cityService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['..', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
