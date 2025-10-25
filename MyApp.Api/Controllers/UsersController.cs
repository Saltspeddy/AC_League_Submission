using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyApp.Api.Data;
using MyApp.Api.Models;
using System.Security.Cryptography;
using System.Text;

namespace MyApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers() =>
            await _context.Users.ToListAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            return user == null ? NotFound() : user;
        }

        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            if (string.IsNullOrWhiteSpace(user.PasswordHash))
                return BadRequest("Password is required.");

            using (var sha = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(user.PasswordHash);
                var hash = sha.ComputeHash(bytes);
                user.PasswordHash = Convert.ToBase64String(hash);
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            user.PasswordHash = "hidden";

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User updatedUser)
        {
            if (id != updatedUser.Id)
                return BadRequest();

            if (!string.IsNullOrEmpty(updatedUser.PasswordHash))
            {
                using (var sha = SHA256.Create())
                {
                    var bytes = Encoding.UTF8.GetBytes(updatedUser.PasswordHash);
                    var hash = sha.ComputeHash(bytes);
                    updatedUser.PasswordHash = Convert.ToBase64String(hash);
                }
            }

            _context.Entry(updatedUser).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromBody] User loginRequest)
        {
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == loginRequest.Username);

            if (existingUser == null)
                return Unauthorized("Invalid username or password.");

            using (var sha = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(loginRequest.PasswordHash);
                var hash = sha.ComputeHash(bytes);
                var hashedPassword = Convert.ToBase64String(hash);

                if (hashedPassword != existingUser.PasswordHash)
                    return Unauthorized("Invalid username or password.");
            }

            existingUser.PasswordHash = "hidden";
            return Ok(existingUser);
        }
    }
}
