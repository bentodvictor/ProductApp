using Microsoft.EntityFrameworkCore;
using ProductApp.Application;
using ProductApp.Application.interfaces;
using ProductApp.Application.Mapper;
using ProductApp.Application.Services;
using ProductApp.Domain.Interfaces;
using ProductApp.Infrastructure;
using ProductApp.Infrastructure.Data;
using ProductApp.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services
    .AddApplication()
    .AddInfrastructure(builder.Configuration);


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Configure automatic database creation and migration
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ProductContext>();

    // Apply pending migrations automatically
    dbContext.Database.Migrate();
}

app.Run();