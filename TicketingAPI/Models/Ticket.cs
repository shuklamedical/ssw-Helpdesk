using System;
using System.ComponentModel.DataAnnotations;

namespace TicketingAPI.Models
{
    public class Ticket
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }
        public string Priority { get; set; }

        public string CreatedBy { get; set; }

        public string AssignedTo { get; set; }

        public string Status { get; set; } = "Open"; // Default status
    }
}
