using Microsoft.Extensions.DependencyInjection;
using ProductApp.Application.Mapper;
using ProductApp.Application.Services;

namespace ProductApp.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddAutoMapper(typeof(ProductProfile));
        services.AddScoped<ProductService>();
        return services;
    }
}