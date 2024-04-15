using AutoMapper;
using CoinCollectionBackend.Database.Entities;
using CoinCollectionBackend.Database.Interfaces;
using CoinCollectionBackend.Database.Repositories;
using CoinCollectionBackend.Web.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CoinCollectionBackend.Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CurrenciesController(ICurrencyRepository currencyRepository, IMapper mapper) : ControllerBase {
        private readonly ICurrencyRepository _currencyRepository = currencyRepository;
        private readonly IMapper _mapper = mapper;

        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<CurrencyDto>>> Get() {
            return Ok(_mapper.Map<IEnumerable<CurrencyDto>>(await _currencyRepository.GetAll()));
        }

        [HttpGet("by-id/{currencyId}")]
        public async Task<ActionResult<CurrencyDto>> GetById(int currencyId)
        {
            Currency? currency = await _currencyRepository.GetById(currencyId);

            if (currency == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<CurrencyDto>(currency));
        }
    }
}
