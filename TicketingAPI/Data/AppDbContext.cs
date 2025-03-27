using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using TicketingAPI.Models;


namespace TicketingAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
