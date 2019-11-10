import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Workorder } from '../Models/workorder';
import { WorkorderService } from '../Services/workorder.service';

import { NumberValidators } from '../../shared/number.validator';
import { GenericValidator } from '../../shared/generic-validator';

@Component({
  templateUrl: './workorder-edit.component.html'
})
export class WorkorderEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Work order Edit';
  errorMessage: string;
  workorderForm: FormGroup;

  workorder: Workorder;
  private sub: Subscription;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  get tags(): FormArray {
    return this.workorderForm.get('tags') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private workorderService: WorkorderService) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      workorderNumber: {
        required: 'Workorder name is required.',
        minlength: 'Workorder name must be at least three characters.',
        maxlength: 'Workorder name cannot exceed 50 characters.'
      },
      workorderCode: {
        required: 'Workorder code is required.'
      },
      starRating: {
        range: 'Rate the workorder between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.workorderForm = this.fb.group({
      workorderNumber: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      workorderCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      tags: this.fb.array([]),
      description: ''
    });

    // Read the workorder Id from the route parameter
    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getWorkorder(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    // This is required because the valueChanges does not provide notification on blur
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    // so we only need to subscribe once.
    merge(this.workorderForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(800)
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.workorderForm);
    });
  }

  addTag(): void {
    this.tags.push(new FormControl());
  }

  deleteTag(index: number): void {
    this.tags.removeAt(index);
    this.tags.markAsDirty();
  }

  getWorkorder(id: number): void {
    this.workorderService.getWorkorder(id)
      .subscribe({
        next: (workorder: Workorder) => this.displayWorkorder(workorder),
        error: err => this.errorMessage = err
      });
  }

  displayWorkorder(workorder: Workorder): void {
    if (this.workorderForm) {
      this.workorderForm.reset();
    }
    this.workorder = workorder;

    if (this.workorder.id === 0) {
      this.pageTitle = 'Add Workorder';
    } else {
      this.pageTitle = `Edit Workorder: ${this.workorder.workorderNumber}`;
    }

    // Update the data on the form
    this.workorderForm.patchValue({
      workorderNumber: this.workorder.workorderNumber,
      workorderCode: this.workorder.statusCode,
      starRating: this.workorder.starRating,
      description: this.workorder.description
    });
    this.workorderForm.setControl('tags', this.fb.array(this.workorder.tags || []));
  }

  deleteWorkorder(): void {
    if (this.workorder.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the workorder: ${this.workorder.workorderNumber}?`)) {
        this.workorderService.deleteWorkorder(this.workorder.id)
          .subscribe({
            next: () => this.onSaveComplete(),
            error: err => this.errorMessage = err
          });
      }
    }
  }

  saveWorkorder(): void {
    if (this.workorderForm.valid) {
      if (this.workorderForm.dirty) {
        const p = { ...this.workorder, ...this.workorderForm.value };

        if (p.id === 0) {
          this.workorderService.createWorkorder(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        } else {
          this.workorderService.updateWorkorder(p)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
            });
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.workorderForm.reset();
    this.router.navigate(['/workorders']);
  }
}
