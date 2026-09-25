import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacilityService } from '../../services/facility.service';
import { Facility } from '../../models/facility.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  facilities: Facility[] = [];

  loading = true;
  error = '';

  totalFacilities = 0;
  inspectedFacilities = 0;
  attentionFacilities = 0;
  averageCleanliness = 0;

  constructor(private facilityService: FacilityService) {}

  ngOnInit(): void {
    this.loadFacilities();
  }

  loadFacilities(): void {
    this.facilityService.getFacilities().subscribe({
      next: (data) => {
        this.facilities = data;
        this.calculateMetrics();
        this.loading = false;
      },
      error: () => {
        this.error = 'Unable to load facility data.';
        this.loading = false;
      }
    });
  }

  calculateMetrics(): void {
    this.totalFacilities = this.facilities.length;

    this.inspectedFacilities = this.facilities.filter(
      facility => facility.status === 'Inspected'
    ).length;

    this.attentionFacilities = this.facilities.filter(
      facility => facility.status === 'Needs Attention'
    ).length;

    if (this.totalFacilities > 0) {
      const totalScore = this.facilities.reduce(
        (sum, facility) => sum + facility.cleanlinessScore,
        0
      );

      this.averageCleanliness = Math.round(
        totalScore / this.totalFacilities
      );
    }
  }
}