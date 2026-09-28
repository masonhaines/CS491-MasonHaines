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

// Registers TodoContext with the DI container, configured to talk to SQL Server.
// builder.Configuration.GetConnectionString reads "DefaultConnection" out of
// appsettings.json at runtime — the server, database name, and auth mode live
// there, not hardcoded here. Any controller that asks for a TodoContext in its
// constructor gets one built from this configuration automatically.

// TodoContext talks to SQL Server. Registering it here means controllers
// can just ask for one instead of creating it themselves.

// Tells the container how to build a TodoContext (using SQL Server) before
// anything asks for one. Same idea as passing an object into a constructor —
// just done once, here, instead of at every place that needs a TodoContext.
builder.Services.AddDbContext<TodoContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// CORS = Cross-Origin Resource Sharing. Browsers block JavaScript from calling
// an API on a different origin (different port counts as different) unless the
// server explicitly allows it. Angular runs on :4200, this API on :5220 — different
// origins — so without this, the browser blocks every request Angular sends here.
builder.Services.AddCors(options =>
{
    // Named policy so it can be applied selectively (rather than globally) below.
    options.AddPolicy("AllowAngularDev", policy =>
    {
        policy.WithOrigins("http://localhost:4200") // only this origin may call the API
              .AllowAnyMethod()   // GET, POST, PUT, DELETE all permitted
              .AllowAnyHeader();  // allows Content-Type: application/json, etc.
    });
});

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

AApplication.UseCors("AllowAngularDev");

AApplication.UseAuthorization();
AApplication.MapControllers();

AApplication.Run();
