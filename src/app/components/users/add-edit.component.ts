﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, CityService, AlertService } from '@app/services';
import { City } from '@app/models';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    roles: Array<string> = new Array('User', 'Admin');
    cities: Array<City> = new Array();
    addCitizenDetails = 0;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private cityService: CityService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
      this.cityService.getAll()
            .pipe(first())
            .subscribe(cities => this.cities = cities);
      this.buildForm();
      this.validateCitizenDetails();
    }

    buildForm() {
      this.form = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        document: ['', Validators.required],
        email: ['', Validators.required],
        cityId: ['', Validators.required],
        address: ['', Validators.required],
        addCitizenDetails: ['', Validators.required],
        isActive: ['true'],
        role: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }

    validateCitizenDetails(){
      const firstName = this.form.get('firstName');
      const lastName = this.form.get('lastName');
      const document = this.form.get('document');
      const address = this.form.get('address');
      const email = this.form.get('email');
      const cityId = this.form.get('cityId');

      this.form.get('addCitizenDetails').valueChanges
      .subscribe(addCitizenDetails => {

        if (addCitizenDetails === 0) {
          firstName.clearValidators();
          lastName.clearValidators();
          document.clearValidators();
          address.clearValidators();
          email.clearValidators();
          cityId.clearValidators();
        }

        firstName.updateValueAndValidity();
        lastName.updateValueAndValidity();
        document.updateValueAndValidity();
        address.updateValueAndValidity();
        email.updateValueAndValidity();
        cityId.updateValueAndValidity();
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
            this.createUser();
        } else {
            this.updateUser();
        }
    }

    private createUser() {
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('User added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['.', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    private updateUser() {
        this.accountService.update(this.id, this.form.value)
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
