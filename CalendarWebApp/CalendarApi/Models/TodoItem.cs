namespace CalendarApi.Models;

// Data that is stored in a table in the database

public class TodoItem
{
    public long Id {get; set;} // unique key in relational database
    public string? Title {get; set;} // this is the title of the todo item, it can be null
    public bool IsComplete {get; set;} // this is a boolean value that indicates whether the todo item is complete or not
    public DateTime? DueDate {get; set;} // this is the due date of the todo item, it can be null
    public string? Notes {get; set;} // this is a note that can be added to the todo item, it can be null
}