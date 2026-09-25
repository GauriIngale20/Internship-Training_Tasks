import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { FacilityService } from '../../services/facility.service';
import { Facility } from '../../models/facility.model';

@Component({
  selector: 'app-inspection-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './inspection-form.html',
  styleUrl: './inspection-form.css'
})
export class InspectionFormComponent implements OnInit {

  inspectionForm: FormGroup;

  facilities: Facility[] = [];

  loading = true;
  submitting = false;

  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private facilityService: FacilityService,
    private router: Router
  ) {
    this.inspectionForm = this.fb.group({
      facilityId: ['', Validators.required],

      cleanlinessScore: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100)
        ]
      ],

      odorScore: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100)
        ]
      ],

      wasteLevel: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100)
        ]
      ],

      waterAvailability: [true, Validators.required],

      footfall: [
        '',
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      complaints: [
        '',
        [
          Validators.required,
          Validators.min(0)
        ]
      ],

      inspectionDate: [
        '',
        Validators.required
      ],

      inspector: [
        '',
        Validators.required
      ]
    });
  }

  ngOnInit(): void {
    this.loadFacilities();
  }

  loadFacilities(): void {
    this.loading = true;
    this.errorMessage = '';

    this.facilityService.getFacilities().subscribe({
      next: (data: Facility[]) => {
        this.facilities = data;
        this.loading = false;
      },

      error: (error) => {
        console.error('Error loading facilities:', error);

        this.errorMessage = 'Unable to load facilities.';
        this.loading = false;
      }
    });
  }

  submitInspection(): void {

    if (this.inspectionForm.invalid) {
      this.inspectionForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formValue = this.inspectionForm.value;

    const facilityId = Number(formValue.facilityId);

    const selectedFacility = this.facilities.find(
      facility => facility.id === facilityId
    );

    if (!selectedFacility) {
      this.errorMessage = 'Please select a valid facility.';
      this.submitting = false;
      return;
    }

    const cleanlinessScore = Number(
      formValue.cleanlinessScore
    );

    const odorScore = Number(
      formValue.odorScore
    );

    const wasteLevel = Number(
      formValue.wasteLevel
    );

    let status: 'Inspected' | 'Needs Attention';

    if (
      cleanlinessScore < 70 ||
      odorScore > 30 ||
      wasteLevel > 40
    ) {
      status = 'Needs Attention';
    } else {
      status = 'Inspected';
    }

    const newFacility: Facility = {
      id: selectedFacility.id,
      name: selectedFacility.name,
      location: selectedFacility.location,

      cleanlinessScore: cleanlinessScore,
      odorScore: odorScore,
      wasteLevel: wasteLevel,

      waterAvailability:
        formValue.waterAvailability,

      footfall: Number(
        formValue.footfall
      ),

      complaints: Number(
        formValue.complaints
      ),

      inspectionDate:
        formValue.inspectionDate,

      inspector:
        formValue.inspector,

      status: status
    };

    this.facilityService
      .addFacility(newFacility)
      .subscribe({

        next: () => {

          this.successMessage =
            'Inspection submitted successfully.';

          this.submitting = false;

          this.inspectionForm.reset({
            facilityId: '',
            cleanlinessScore: '',
            odorScore: '',
            wasteLevel: '',
            waterAvailability: true,
            footfall: '',
            complaints: '',
            inspectionDate: '',
            inspector: ''
          });
        },

        error: (error) => {

          console.error(
            'Error submitting inspection:',
            error
          );

          this.errorMessage =
            'Unable to submit inspection.';

          this.submitting = false;
        }
      });
  }

  cancel(): void {
    this.router.navigate(['/facilities']);
  }
}