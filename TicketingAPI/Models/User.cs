namespace TicketingAPI.Models
{
    public class User
    {
        public int Id { get; set; } // Primary Key
        public string FullName { get; set; }
        public string Email { get; set; }

        public string PasswordHash { get; set; }
        public string Role { get; set; } // Example: "Admin", "Support", "User"
    }
}
