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
    public class CoinRepository(CoinCollectionContext context) : ICoinRepository
    {
        private readonly CoinCollectionContext _context = context;

        public async Task<IEnumerable<Coin>> GetAll()
        {
            return await _context.Coins
                .Include(coin => coin.Currency)
                .ToListAsync();
        }

        public async Task<Coin?> GetById(int coinId)
        {
            return await _context.Coins
                .Include(coin => coin.Currency)
                .FirstOrDefaultAsync(coin => coin.Id == coinId);
        }

        public async Task<IEnumerable<Coin>> GetByCurrency(int currencyId)
        {
            return await _context.Coins
                .Where(coin => coin.CurrencyId == currencyId)
                .OrderBy(coin => coin.Currency)
                .ThenByDescending(coin => coin.Value)
                .ToListAsync();
        }
        public async Task<IDictionary<Currency, IEnumerable<Coin>>> GetGroupedByCurrency()
        {
            Dictionary<Currency, IEnumerable<Coin>> groups = [];

            await _context.Coins
                .GroupBy(coin => coin.Currency)
                .ForEachAsync(group => groups.Add(group.Key, [.. group]));

            return groups;
        }

        public async Task<Coin> CreateCoin(Coin coin)
        {
            await _context.Coins.AddAsync(coin);

            await _context.SaveChangesAsync();

            return coin;
        }

        public async Task<Coin> UpdateCoin(Coin coin)
        {
            _context.Coins.Update(coin);

            await _context.SaveChangesAsync();

            return coin;
        }

        public async Task<Coin> DeleteCoin(Coin coin)
        {
            _context.Coins.Remove(coin);

            await _context.SaveChangesAsync();

            return coin;
        }
    }
}
