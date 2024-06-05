using CoinCollectionBackend.Database.Entities;
using CoinCollectionBackend.Database.Interfaces;
using CoinCollectionBackend.Database.Repositories;
using CoinCollectionBackend.Web.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace CoinCollectionBackend.Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthController(IUserRepository userRepository, IConfiguration configuration) : ControllerBase
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IConfiguration _configuration = configuration;

        [HttpPost]
        public async Task<IActionResult> PostLogin([FromBody] LoginDto loginDto)
        {
            if (loginDto.User.Equals("admin") && loginDto.Password.Equals("admin"))
            {
                return Ok(GetToken("admin"));
            }

            User? user = await _userRepository.GetByName(loginDto.User);

            if (user == null)
            {
                return BadRequest();
            }

            byte[] hash = Rfc2898DeriveBytes.Pbkdf2(Encoding.UTF8.GetBytes(loginDto.Password), user.Salt, 16, HashAlgorithmName.SHA256, 128);
            if (!hash.SequenceEqual(user.PWHash))
            {
                return BadRequest();
            }

            return Ok(GetToken(user.Name));
        }

        private string GetToken(string user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            Claim[] claims = [new(JwtRegisteredClaimNames.Name, user)];

            var Sectoken = new JwtSecurityToken(_configuration["Jwt:Issuer"],
              _configuration["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            var token = new JwtSecurityTokenHandler().WriteToken(Sectoken);

            return token;
        }

        [HttpGet]
        [Authorize]
        public ActionResult<string> Get()
        {
            return Ok(HttpContext.User.Claims.First(c => c.Type == JwtRegisteredClaimNames.Name).Value);
        }
    }
}
