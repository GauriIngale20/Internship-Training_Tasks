import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { FacilityService } from '../../services/facility.service';
import { Facility } from '../../models/facility.model';

@Component({
  selector: 'app-facility-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './facility-details.html',
  styleUrl: './facility-details.css'
})
export class FacilityDetailsComponent implements OnInit {

  facility: Facility | null = null;

  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private facilityService: FacilityService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.error = 'Invalid facility ID.';
      this.loading = false;
      return;
    }

    this.loadFacility(id);
  }

  loadFacility(id: number): void {
    this.facilityService.getFacility(id).subscribe({
      next: (data) => {
        this.facility = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Unable to load facility details.';
        this.loading = false;
      }
    });
  }
}