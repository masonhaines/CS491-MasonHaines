using Microsoft.AspNetCore.Mvc;
using CalendarApi.Models;
namespace CalendarApi.Controllers;

[ApiController]
[Route("[controller]")] 
public class TodoController : ControllerBase
{
    private readonly TodoContext _context; // instatiate TodoContext class to access the database context for the todo application
    // this is for constructor dependency injection

    // consdtructor for dependency injection
    public TodoController (TodoContext context)
    {
        _context = context; // reference to the TodoContext instance that was injected into the controller's constructor
    }
    // Now the controller can access TodoItems through the _context field, 
    // whihc is a reference to the TodoContext instance that was injected into the controller's constructor

    [HttpGet]
    public ActionResult<List<TodoItem>> GetTodoITems()
    {
        return _context.TodoItems.ToList(); // returns a list of all TodoItems in the database 
        // ie executes a SQL query to retrieve all records from the TodoItems table and returns them as a list of TodoItem objects
    }

    [HttpPost]
    public ActionResult<TodoItem> CreateTodoItem(TodoItem item)
    {
        _context.TodoItems.Add(item); // adds the new TodoItem to the database context ie this is like the staging lane 
        _context.SaveChanges(); // saves the changes to the database ie it executes a SQL INSERT statement to add the new record to the TodoItems table
        return item; // returns the newly created TodoItem Object to the client as a reponse to the HTTP POST request
    }

    [HttpPut("{id}")]
    public ActionResult<TodoItem> UpdateTodoItem(long id, TodoItem updatedItem)
    {
        var existingItem = _context.TodoItems.Find(id); // finds the existing TodoItem in the database by its id
        if (existingItem == null) // if the item does not exist, return a 404 Not Found response
        {
            return NotFound(); 
        }

        // update the properties of the existing item with the values from the updated item
        existingItem.Title = updatedItem.Title;
        existingItem.IsComplete = updatedItem.IsComplete;
        existingItem.DueDate = updatedItem.DueDate;
        existingItem.Notes = updatedItem.Notes;

        _context.SaveChanges(); // saves the changes to the database ie it executes a SQL UPDATE statement to update the record in the TodoItems table

        return existingItem; // returns the updated TodoItem Object to the client as a response to the HTTP PUT request
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteTodoItem(long id)
    {
        var existingItem = _context.TodoItems.Find(id); 
                if (existingItem == null) // if the item does not exist, return a 404 Not Found response
        {
            return NotFound(); 
        }

        _context.TodoItems.Remove(existingItem); // removes the existing TodoItem from the database context ie this is like the staging lane
        _context.SaveChanges(); // saves the changes to the database ie it executes a SQL DELETE statement to remove the record from the TodoItems table

        return NoContent(); // returns a 204 No Content response to the client as a response to the HTTP DELETE request
    }
}