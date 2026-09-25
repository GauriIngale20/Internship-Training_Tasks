import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Facility, Inspection } from '../models/facility.model';

interface FacilityResponse {
  status: string;
  count: number;
  data: Facility[];
}

interface SingleFacilityResponse {
  status: string;
  data: Facility;
}

interface InspectionResponse {
  status: string;
  count?: number;
  data: Inspection[];
}

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getFacilities(): Observable<Facility[]> {
    return this.http
      .get<FacilityResponse>(`${this.apiUrl}/facilities`)
      .pipe(
        map(response => response.data)
      );
  }

  getFacility(id: number): Observable<Facility> {
    return this.http
      .get<SingleFacilityResponse>(
        `${this.apiUrl}/facilities/${id}`
      )
      .pipe(
        map(response => response.data)
      );
  }

  addFacility(facility: Facility): Observable<Facility> {
    return this.http
      .post<SingleFacilityResponse>(
        `${this.apiUrl}/facilities`,
        facility
      )
      .pipe(
        map(response => response.data)
      );
  }

  getInspectionHistory(): Observable<Inspection[]> {
    return this.http
      .get<InspectionResponse>(
        `${this.apiUrl}/inspections/history`
      )
      .pipe(
        map(response => response.data)
      );
  }
}