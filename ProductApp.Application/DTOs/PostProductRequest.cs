namespace ProductApp.Application.DTOs;

public record PostProductRequest(
    string Name,
    decimal Value
);