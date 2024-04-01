using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    public class TodoContext(DbContextOptions<TodoContext> options) : DbContext(options)
    {
        public DbSet<TodoItem> TodoItems { get; set; }
    }
}
