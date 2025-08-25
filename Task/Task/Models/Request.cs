using System.ComponentModel.DataAnnotations;

namespace Task.Models
{
    public class Request
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "שם הפונה הוא שדה חובה")]
        public string Name { get; set; }

        [Required(ErrorMessage = "נושא הפנייה הוא שדה חובה")]
        public string Subject { get; set; }

        public string Content { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    




}
