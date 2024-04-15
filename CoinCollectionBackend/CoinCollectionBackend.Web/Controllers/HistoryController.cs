using AutoMapper;
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

        [HttpGet("by-id/{coinId}")]
        [Produces("application/json")]
        public async Task<ActionResult<HistoryEntryByCoinDto>> GetByCoinId(int coinId)
        {
            return Ok(_mapper.Map<IEnumerable<HistoryEntryByCoinDto>>(await _historyRepository.GetByCoinId(coinId)));
        }

        [HttpGet("by-id/{coinId}/updates")]
        [Produces("text/event-stream")]
        public async Task GetUpdatesByCoinId(int coinId)
        {
            Response.Headers.TryAdd("Content-Type", "text/event-stream");
            Response.Headers.TryAdd("Cache-Control", "no-cache");
            Response.Headers.TryAdd("Connection", "keep-alive");
            int id = coinId;
            while (id < coinId + 5)
            {
                await Response.WriteAsync("data:dummy");
                await Response.WriteAsync("\n\n");
                await Response.Body.FlushAsync();
                await Task.Delay(10000);
            }
        }
    }
}
