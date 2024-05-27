using AutoMapper;
using CoinCollectionBackend.Database.Entities;
using CoinCollectionBackend.Database.Interfaces;
using CoinCollectionBackend.Database.Repositories;
using CoinCollectionBackend.Web.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace CoinCollectionBackend.Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class HistoryController(IHistoryRepository historyRepository, IMapper mapper) : ControllerBase
    {
        private readonly IHistoryRepository _historyRepository = historyRepository;
        private readonly IMapper _mapper = mapper;

        [HttpGet]
        [Produces("application/json")]
        public async Task<ActionResult<IEnumerable<HistoryEntryByCoinDto>>> GetByCoin([FromQuery] int currencyId, [FromQuery] int value, [FromQuery] int year)
        {
            return Ok(_mapper.Map<IEnumerable<HistoryEntryByCoinDto>>(await _historyRepository.GetByCoin(_mapper.Map<Coin>(new CoinDto
            {
                CurrencyId = currencyId,
                Value = value,
                Year = year
            }))));
        }

        [HttpGet("updates")]
        [Produces("text/event-stream")]
        public async Task GetUpdatesByCoin([FromQuery] int currencyId, [FromQuery] int value, [FromQuery] int year)
        {
            Response.Headers.TryAdd("Content-Type", "text/event-stream");
            Response.Headers.TryAdd("Cache-Control", "no-cache");
            Response.Headers.TryAdd("Connection", "keep-alive");

            int id = 0;
            while (id < 5)
            {
                await Response.WriteAsync("event: data");
                await Response.WriteAsync("\n");

                HistoryEntryByCoinDto historyEntryByCoinDto = new HistoryEntryByCoinDto
                {
                    DateTime = DateTime.Now,
                    EntryValue = id
                };

                await Response.WriteAsync("data: 1");
                await Response.WriteAsync("\n\n");
                await Response.Body.FlushAsync();
                await Task.Delay(10000);
                id++;
            }
            await Response.WriteAsync("event: close");
            await Response.WriteAsync("\n");
            await Response.WriteAsync("data: close");
            await Response.WriteAsync("\n\n");
            await Response.Body.FlushAsync();
        }
    }
}
