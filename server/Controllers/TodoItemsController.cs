using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private readonly TodoContext _context;
        private readonly IMapper _mapper;

        public TodoItemsController(TodoContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
        {
            return await _context.TodoItems.ToListAsync();
        }

        // POST: api/TodoItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItemDto todoItemDto)
        {
            var todoItem = _mapper.Map<TodoItem>(todoItemDto);
            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
        }

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem is null)
            {
                return NotFound();
            }

            return todoItem;
        }

        // PATCH: api/TodoItems/5
        [HttpPatch("{id}")]
        public async Task<ActionResult<TodoItem>> PatchTodoItem(long id, [FromBody] JsonPatchDocument<TodoItem> document)
        {
            if (document is null)
            {
                return BadRequest();
            }

            var todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem is null)
            {
                return NotFound();
            }

            document.ApplyTo(todoItem, ModelState);

            if (!TryValidateModel(todoItem))
            {
                return BadRequest(ModelState);
            }

            _context.Update(todoItem);
            await _context.SaveChangesAsync();

            return todoItem;
        }

        // PUT: api/TodoItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(long id, TodoItem todoItem)
        {
            if (id != todoItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(todoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TodoItem>> DeleteTodoItem(long id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);
            if (todoItem is null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();

            return todoItem;
        }

        // DELETE: api/TodoItems/completed
        [HttpDelete("completed")]
        public async Task<ActionResult<List<TodoItem>>> DeleteCompletedTodoItems()
        {
            var completedTodoItems = await _context.TodoItems.Where(todoItem => todoItem.IsComplete).ToListAsync();

            if (completedTodoItems.IsNullOrEmpty())
            {
                return NotFound();
            }

            completedTodoItems.ForEach(todoItem => _context.TodoItems.Remove(todoItem));
            await _context.SaveChangesAsync();

            return completedTodoItems;
        }

        private bool TodoItemExists(long id)
        {
            return _context.TodoItems.Any(todoItem => todoItem.Id == id);
        }
    }
}
