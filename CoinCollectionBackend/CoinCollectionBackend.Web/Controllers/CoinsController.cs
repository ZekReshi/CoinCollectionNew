using AutoMapper;
using CoinCollectionBackend.Database.Entities;
using CoinCollectionBackend.Database.Interfaces;
using CoinCollectionBackend.Database.Repositories;
using CoinCollectionBackend.Web.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace CoinCollectionBackend.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CoinsController(ICoinRepository coinRepository, IMapper mapper, IConfiguration configuration) : ControllerBase
    {
        private readonly ICoinRepository _coinRepository = coinRepository;
        private readonly IMapper _mapper = mapper;
        private readonly IConfiguration _configuration = configuration;

        [HttpGet("all")]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<CoinDto>>> Get()
        {
            return Ok(_mapper.Map<IEnumerable<CoinDto>>(await _coinRepository.GetAll()));
        }

        [HttpGet("by-id/{coinId}")]
        [Produces("application/json")]
        public async Task<ActionResult<CoinDto>> GetById(int coinId)
        {
            Coin? coin = await _coinRepository.GetById(coinId);

            if (coin == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<CoinDto>(coin));
        }

        [HttpGet("by-currency/{currencyId}")]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<CoinDto>>> GetGroupedByCurrency(int currencyId)
        {
            IEnumerable<Coin> coins = await _coinRepository.GetByCurrency(currencyId);

            return Ok(_mapper.Map<IEnumerable<CoinDto>>(coins));
        }

        [HttpGet("by-currencies")]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<CoinGroupByCurrencyDto>>> GetGroupedByCurrency()
        {
            IDictionary<Currency, IEnumerable<Coin>> groups = await _coinRepository.GetGroupedByCurrency();

            return Ok(_mapper.Map<IEnumerable<CoinGroupByCurrencyDto>>(groups));
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<CoinDto>> PostCoin([FromBody] CoinDto coinDto)
        {
            Coin coin = await _coinRepository.CreateCoin(_mapper.Map<Coin>(coinDto));

            return Ok(_mapper.Map<CoinDto>(coin));
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult<CoinDto>> PutCoin([FromBody] CoinDto coinDto)
        {
            Coin coin = await _coinRepository.UpdateCoin(_mapper.Map<Coin>(coinDto));

            return Ok(_mapper.Map<CoinDto>(coin));
        }

        [HttpDelete("by-id/{coinId}")]
        [Authorize]
        public async Task<ActionResult<CoinDto>> DeleteCoin(int coinId)
        {
            Coin? coin = await _coinRepository.GetById(coinId);

            if (coin == null)
            {
                return NotFound();
            }

            coin = await _coinRepository.DeleteCoin(coin);

            return Ok(_mapper.Map<CoinDto>(coin));
        }

        [HttpGet("by-id/{coinId}/front")]
        [Produces("image/png")]
        public async Task<ActionResult> GetFront(int coinId)
        {
            string path = Path.Combine(_configuration["Images"], $"{coinId}f.png");

            if (!System.IO.File.Exists(path))
            {
                return NotFound();
            }

            Byte[] b = await System.IO.File.ReadAllBytesAsync(path);       
            return File(b, "image/jpeg");
        }

        [HttpGet("by-id/{coinId}/back")]
        [Produces("image/png")]
        public async Task<ActionResult> GetBack(int coinId)
        {
            string path = Path.Combine(_configuration["Images"], $"{coinId}b.png");

            if (!System.IO.File.Exists(path))
            {
                return NotFound();
            }

            byte[] b = await System.IO.File.ReadAllBytesAsync(path);
            return File(b, "image/jpeg");
        }

        [HttpPost("by-id/{coinId}/front")]
        [Consumes("image/png")]
        [Authorize]
        public async Task<ActionResult> PostFront(int coinId, [FromBody] byte[] image)
        {
            string path = Path.Combine(_configuration["Images"], $"{coinId}f.png");

            await System.IO.File.WriteAllBytesAsync(path, image);

            return Ok();
        }

        [HttpPost("by-id/{coinId}/back")]
        [Consumes("image/png")]
        [Authorize]
        public async Task<ActionResult> PostBack(int coinId, [FromBody] byte[] image)
        {
            string path = Path.Combine(_configuration["Images"], $"{coinId}b.png");

            await System.IO.File.WriteAllBytesAsync(path, image);

            return Ok();
        }
    }
}
