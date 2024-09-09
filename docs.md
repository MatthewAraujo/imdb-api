## Table of Contents

1. [Overview](#overview)
2. [Technologies Used](#technologies-used)
3. [Architecture](#architecture)
4. [Data Models](#data-models)
5. [API Endpoints](#api-endpoints)
6. [Authentication and Authorization](#authentication-and-authorization)
7. [Validation and Error Handling](#validation-and-error-handling)
8. [Testing](#testing)
9. [Best Practices and Coding Standards](#best-practices-and-coding-standards)

---

## Overview

#testando

This API is designed to connect developers and companies, offering a matchmaking system based on skills, preferences, and requirements. The API allows profile registration, candidate and job search, and communication between parties after a "match."

## Technologies Used

- **Language**: C# with .NET 8
- **Database**: MySQL with Entity Framework Core
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: FluentValidation
- **Documentation**: Swagger
- **Testing**: xUnit, Moq

## Architecture

The API follows a **layered architecture** based on Domain-Driven Design (DDD), including:

- **Domain Layer**: Contains domain models and business rules.
- **Application Layer**: Manages application logic, including services and use cases.
- **Infrastructure Layer**: Handles data persistence and communication with the database.
- **Presentation Layer**: Responsible for the API's communication interface (controllers).

## Data Models

### User

```csharp
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string PasswordHash { get; set; }
    public string Role { get; set; } // Developer or Company
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
```

### Developer

```csharp
public class Developer : User
{
    public string Stack { get; set; }
    public int ExperienceYears { get; set; }
    public string Location { get; set; }
    public string Availability { get; set; } // Freelancer, Full-time, Part-time
    public string Bio { get; set; }
    public string GitHub { get; set; }
    public string LinkedIn { get; set; }
}
```

### Company

```csharp
public class Company : User
{
    public string CompanyName { get; set; }
    public string Sector { get; set; }
    public string Location { get; set; }
    public string Description { get; set; }
    public string Website { get; set; }
    public List<JobOffer> JobOffers { get; set; }
}
```

### Job Offer

```csharp
public class JobOffer
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Requirements { get; set; }
    public string Benefits { get; set; }
    public DateTime PostedAt { get; set; }
    public Company Company { get; set; }
}
```

## API Endpoints

### Authentication

- `POST /api/auth/register`: User registration (Developer or Company).
- `POST /api/auth/login`: User login and JWT token generation.

### Developers

- `GET /api/developers`: List all developers.
- `GET /api/developers/{id}`: Get details of a specific developer.
- `PUT /api/developers/{id}`: Update developer information.
- `DELETE /api/developers/{id}`: Delete a developer.

### Companies

- `GET /api/companies`: List all companies.
- `GET /api/companies/{id}`: Get details of a specific company.
- `PUT /api/companies/{id}`: Update company information.
- `DELETE /api/companies/{id}`: Delete a company.

### Job Offers

- `GET /api/joboffers`: List all job offers.
- `GET /api/joboffers/{id}`: Get details of a specific job offer.
- `POST /api/joboffers`: Create a new job offer.
- `PUT /api/joboffers/{id}`: Update a job offer.
- `DELETE /api/joboffers/{id}`: Delete a job offer.

### Matchmaking

- `POST /api/match`: Create a match between a developer and a company.
- `GET /api/matches`: List all matches.

## Authentication and Authorization

- Use of **JWT** for user authentication.
- **Role-based authorization**: The API differentiates permissions for developers and companies.

## Validation and Error Handling

- **Validation**: Implemented with **FluentValidation** to ensure the integrity of received data.
- **Error Handling**: Centralized in an exception handling middleware, ensuring consistent error responses.

## Testing

- **Unit**: Tests for isolated methods and functionalities.
- **Integration**: Tests verifying interactions between different parts of the system.
- **Test Coverage**: Aim for a minimum of 80% coverage.

## Best Practices and Coding Standards

- **Clean Code**: Maintain clean, readable, and modular code.
- **SOLID**: Follow SOLID principles for software design.
- **Code Review**: All code must undergo review before being merged into the project.
