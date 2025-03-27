using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketingAPI.Models;
using TicketingAPI.Data;
using Microsoft.EntityFrameworkCore;

[Route("api/tickets")]
[ApiController]
public class TicketsController : ControllerBase
{
    private readonly AppDbContext _context;

    public TicketsController(AppDbContext context)
    {
        _context = context;
    }

    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets()
    {
        return await _context.Tickets.ToListAsync();
    }

   
    [HttpGet("{id}")]
    public async Task<ActionResult<Ticket>> GetTicket(int id)
    {
        var ticket = await _context.Tickets.FindAsync(id);
        if (ticket == null)
        {
            return NotFound();
        }
        return ticket;
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetTicketStats()
    {
        var unresolvedCount = await _context.Tickets.CountAsync(t => t.Status == "Unresolved");
        var openCount = await _context.Tickets.CountAsync(t => t.Status == "Open");
        var onHoldCount = await _context.Tickets.CountAsync(t => t.Status == "OnHold");

        return Ok(new
        {
            unresolved = unresolvedCount,
            open = openCount,
            onHold = onHoldCount
        });
    }


    [HttpPost]
    public async Task<ActionResult<Ticket>> CreateTicket(TicketDto ticketDto)
    {
        var loggedInUser = User.Identity?.Name ?? "Admin"; 

        var ticket = new Ticket
        {
            Title = ticketDto.Title,
            Description = ticketDto.Description,
            Priority = ticketDto.Priority,
            AssignedTo = ticketDto.AssignedTo,
            Status = "Open",
            CreatedBy = loggedInUser 
        };

        _context.Tickets.Add(ticket);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTicket), new { id = ticket.Id }, ticket);
    }

   
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTicket(int id, TicketDto ticketDto)
    {
        var ticket = await _context.Tickets.FindAsync(id);
        if (ticket == null)
        {
            return NotFound();
        }

        ticket.Title = ticketDto.Title;
        ticket.Description = ticketDto.Description;
        ticket.Priority = ticketDto.Priority; 
        ticket.AssignedTo = ticketDto.AssignedTo; 
        ticket.Status = ticketDto.Status;

        _context.Entry(ticket).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTicket(int id)
    {
        var ticket = await _context.Tickets.FindAsync(id);
        if (ticket == null)
        {
            return NotFound();
        }

        _context.Tickets.Remove(ticket);
        await _context.SaveChangesAsync();

        return NoContent();
    }

   
    [HttpGet("/api/users")]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        return await _context.Users.ToListAsync(); 
    }
}
