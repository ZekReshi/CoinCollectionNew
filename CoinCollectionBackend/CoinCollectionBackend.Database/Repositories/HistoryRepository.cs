using CoinCollectionBackend.Database.Context;
using CoinCollectionBackend.Database.Entities;
using CoinCollectionBackend.Database.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinCollectionBackend.Database.Repositories
{
    public class HistoryRepository(CoinCollectionContext context) : IHistoryRepository
    {
        private readonly CoinCollectionContext _context = context;

        public async Task<IEnumerable<HistoryEntry>> GetByCoin(Coin coin)
        {
            return await _context.HistoryEntries
                .Where(entry => entry.CurrencyId == coin.CurrencyId && entry.Value == coin.Value && entry.Year == coin.Year)
                .OrderBy(entry => entry.DateTime)
                .ToListAsync();
        }
    }
}
