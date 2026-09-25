import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { FacilityService } from '../../services/facility.service';
import { Facility } from '../../models/facility.model';

@Component({
  selector: 'app-facility-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './facility-list.html',
  styleUrl: './facility-list.css'
})
export class FacilityListComponent implements OnInit {

  facilities: Facility[] = [];
  filteredFacilities: Facility[] = [];

  searchText = '';
  selectedStatus = 'All';
  sortBy = 'name';

  loading = true;
  error = '';

  constructor(private facilityService: FacilityService) {}

  ngOnInit(): void {
    this.loadFacilities();
  }

  loadFacilities(): void {
    this.facilityService.getFacilities().subscribe({
      next: (data) => {
        this.facilities = data;
        this.filteredFacilities = [...data];
        this.loading = false;
      },
      error: () => {
        this.error = 'Unable to load facility data.';
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    let result = [...this.facilities];

    if (this.searchText.trim()) {
      const search = this.searchText.toLowerCase();

      result = result.filter(facility =>
        facility.name.toLowerCase().includes(search) ||
        facility.location.toLowerCase().includes(search)
      );
    }

    if (this.selectedStatus !== 'All') {
      result = result.filter(
        facility => facility.status === this.selectedStatus
      );
    }

    result.sort((a, b) => {
      if (this.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }

      if (this.sortBy === 'cleanliness') {
        return b.cleanlinessScore - a.cleanlinessScore;
      }

      if (this.sortBy === 'complaints') {
        return b.complaints - a.complaints;
      }

      return 0;
    });

    this.filteredFacilities = result;
  }

  clearFilters(): void {
    this.searchText = '';
    this.selectedStatus = 'All';
    this.sortBy = 'name';
    this.applyFilters();
  }
}