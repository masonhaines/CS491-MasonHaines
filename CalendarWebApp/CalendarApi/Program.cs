// 200 status means request has succeeded
// 201 status means request has been fulfilled and has resulted in one or more new resources being created
using Microsoft.EntityFrameworkCore;
using CalendarApi.Models;

// Instantiate a new dependency injection container for the application. design pattern is called IoC (Inversion of Control) and is a fundamental part of ASP.NET Core.
// This container will hold all the services that the application needs to run, such as controllers, database contexts, and other services.
var builder = WebApplication.CreateBuilder(args); // This is the entry point for the application.s

// Add services to the container. 
builder.Services.AddControllers(); // This line adds the controllers to the dependency injection container. 
// Controllers are classes that handle HTTP requests and return HTTP responses. 
// They are responsible for processing incoming requests, performing any necessary business logic, 
// and returning the appropriate response to the client.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

// Dependency Injection for TodoContext 
// builder.Configuration is how you read values out of appsettings.json at runtime.
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))); // UseInMemoryDatabase is a method that configures the context to use an in-memory database. This is useful for testing and development purposes, as it allows you to quickly set up a database without needing to configure a full database server.


var AApplication = builder.Build();

AApplication.MapGet("/", () => "Hello World!");


// Configure the HTTP request pipeline.
if (AApplication.Environment.IsDevelopment())
{
    // AApplication.MapOpenApi();
    AApplication.UseSwagger();
    AApplication.UseSwaggerUI();
}

AApplication.UseHttpsRedirection();

AApplication.UseAuthorization();

AApplication.MapControllers();

AApplication.Run();
