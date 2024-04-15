using AutoMapper;
using CoinCollectionBackend.Database.Entities;
using CoinCollectionBackend.Database.Interfaces;
using CoinCollectionBackend.Database.Repositories;
using CoinCollectionBackend.Web.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace CoinCollectionBackend.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CoinsController(ICoinRepository coinRepository, IMapper mapper) : ControllerBase
    {
        private readonly ICoinRepository _coinRepository = coinRepository;
        private readonly IMapper _mapper = mapper;

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
    }
}
