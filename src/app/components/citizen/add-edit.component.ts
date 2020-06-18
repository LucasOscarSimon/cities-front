import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { CitizenService, AlertService, CityService } from '@app/services';
import { City } from '@app/models';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    cities: Array<City> = new Array();

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private citizenService: CitizenService,
        private alertService: AlertService,
        private cityService: CityService
    ) {

    }

    ngOnInit() {
      this.id = this.route.snapshot.params.id;
      this.isAddMode = !this.id;
      this.cityService.getAll().pipe(first()).subscribe(cities => this.cities = cities);


      if (!this.isAddMode) {

        this.mapCitizen();
      }
      this.buildForm();
    }

    mapCitizen(){
      this.citizenService.getById(this.id)
      .pipe(first())
      .subscribe(x => {
          this.f.firstName.setValue(x.firstName);
          this.f.lastName.setValue(x.lastName);
          this.f.document.setValue(x.document);
          this.f.email.setValue(x.email);
          this.f.address.setValue(x.address);
          this.f.city.setValue(this.cities.find(city => city.id === x.city.id));
      });
    }

    buildForm(){
      this.form = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        document: ['', Validators.required],
        email: ['', Validators.required],
        address: ['', Validators.required],
        city: ['', Validators.required],
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
            this.createCitizen();
        } else {
            this.updateCitizen();
        }
    }

    private createCitizen() {
        this.citizenService.create(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Citizen added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['.', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    private updateCitizen() {
        this.citizenService.update(this.id, this.form.value)
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
