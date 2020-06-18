import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, StateService } from '@app/services';
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
    ) {

    }

    ngOnInit() {
      this.id = this.route.snapshot.params.id;
      this.isAddMode = !this.id;
      this.stateService.getAll().pipe(first()).subscribe(states => this.states = states);


      if (!this.isAddMode) {

        this.mapState();
      }
      this.buildForm();
    }

    mapState(){
      this.stateService.getById(this.id)
      .pipe(first())
      .subscribe(x => {
          this.f.name.setValue(x.name);
      });
    }

    buildForm(){
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
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
            this.createState();
        } else {
            this.updateState();
        }
    }

    private createState() {
        this.stateService.create(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('State added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['.', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    private updateState() {
        this.stateService.update(this.id, this.form.value)
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
