namespace ProductApp.Application.DTOs;

public record GetProductRequest(
    Guid Id,
    string Name,
    decimal Value,
    DateTime InclusionDate
);