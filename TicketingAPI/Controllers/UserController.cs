using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TicketingAPI.Data;
using TicketingAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/user")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly AppDbContext _context;

    public UserController(IConfiguration config, AppDbContext context)
    {
        _config = config;
        _context = context;
    }

    //GET Method: api/user
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        var users = await _context.Users
            .Where(u => u.Role.ToLower() != "admin")
            .ToListAsync();
        return Ok(users);
    }

    //Method POST: api/user/login
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginModel login)
    {
        var user = _context.Users.SingleOrDefault(u => u.Email == login.Email && u.PasswordHash == login.Password);

        if (user != null)
        {
            var token = GenerateToken(user.Email);
            return Ok(new { Token = token, User = user, Role = user.Role }); // Ensure Role is included
        }

        return Unauthorized();
    }

    private string GenerateToken(string email)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.Email, email)
        };

        var token = new JwtSecurityToken(
            _config["Jwt:Issuer"],
            _config["Jwt:Audience"],
            claims,
            expires: DateTime.UtcNow.AddMinutes(30),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

public class LoginModel
{
    public string Email { get; set; }
    public string Password { get; set; }
}
