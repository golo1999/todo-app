using System.ComponentModel.DataAnnotations;

namespace server.Models
{
    public class TodoItem
    {
        [Key]
        public long Id { get; set; }
        [Required]
        [MaxLength(50)]
        public required string Name { get; set; }
        [Required]
        public bool IsComplete { get; set; }
        [Required]
        public required string DateTime { get; set; }
    }
}
