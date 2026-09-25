# Day 9 — Angular + TypeScript + API Integration

## Facility Inspection Dashboard

A web-based **Facility Inspection Dashboard** built using Angular and TypeScript. The application integrates with a REST API to manage facility inspection data, display inspection metrics, search and filter facilities, view detailed inspection information, and submit new inspections.

## Features

* Dashboard with facility inspection metrics
* Facility listing with search and filtering
* Sort facilities by name, cleanliness score, and complaints
* Detailed facility inspection view
* New inspection form using Reactive Forms
* Form validation and error handling
* REST API integration using Angular HttpClient
* TypeScript interfaces for structured API data
* Express.js backend with JSON-based data storage
* CORS-enabled API communication
* Responsive and user-friendly interface

## Tech Stack

* **Frontend:** Angular, TypeScript, HTML, CSS
* **API:** Node.js, Express.js
* **Data:** JSON
* **HTTP & Reactive Programming:** HttpClient, RxJS
* **Forms:** Angular Reactive Forms
* **Development Tools:** VS Code, npm

## Project Structure

```text
day-09/
├── angular-app/
│   ├── src/
│   │   └── app/
│   │       ├── components/
│   │       │   ├── dashboard/
│   │       │   ├── facility-details/
│   │       │   ├── facility-list/
│   │       │   └── inspection-form/
│   │       ├── models/
│   │       │   └── facility.model.ts
│   │       ├── services/
│   │       │   └── facility.service.ts
│   │       ├── app.config.ts
│   │       ├── app.routes.ts
│   │       ├── app.ts
│   │       ├── app.html
│   │       └── app.css
│   ├── package.json
│   └── package-lock.json
│
├── api-integration/
│   ├── data/
│   │   └── facilities.json
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

## REST API Endpoints

| Method | Endpoint                   | Description                  |
| ------ | -------------------------- | ---------------------------- |
| GET    | `/`                        | API health check             |
| GET    | `/api/facilities`          | Get all facilities           |
| GET    | `/api/facilities/:id`      | Get facility by ID           |
| POST   | `/api/facilities`          | Add inspection/facility data |
| GET    | `/api/inspections/history` | Get inspection history       |

## Key Concepts Demonstrated

* Angular application architecture
* Standalone components
* Angular routing and route parameters
* Data binding and event handling
* Reactive Forms
* Services and Dependency Injection
* HTTP Client and REST API integration
* RxJS Observables
* TypeScript interfaces and type safety
* Search, filtering, and sorting
* API error handling
* Component-based UI development
* Express.js REST API development
* JSON-based data management
