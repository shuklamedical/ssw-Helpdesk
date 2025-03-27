public class TicketDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string Priority { get; set; } // New Priority Field
    public string AssignedTo { get; set; } // New Assigned User Field
    public string Status { get; set; }

    public class User
    {
        public string fullName{ get; set; }
    }

}
