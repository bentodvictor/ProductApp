namespace ProductApp.Application.DTOs;

public record PutProductRequest(
    Guid Id,
    string Name,
    decimal Value
);