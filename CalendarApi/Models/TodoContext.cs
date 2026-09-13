using Microsoft.EntityFrameworkCore;

namespace CalendarApi.Models;

// This class represents the database context for the Todo application.
public class TodoContext : DbContext // Microsoft.EntityFrameworkCore.DbContext class
{
    public TodoContext(DbContextOptions<TodoContext> options)
        : base(options)
    {
    }

    public DbSet<TodoItem> TodoItems { get; set; } = null!; 
}