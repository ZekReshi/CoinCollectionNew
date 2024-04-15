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
    public class CurrencyRepository(CoinCollectionContext context) : ICurrencyRepository
    {
        private readonly CoinCollectionContext _context = context;

        public async Task<IEnumerable<Currency>> GetAll()
        {
            return await _context.Currencies.ToListAsync();
        }

        public async Task<Currency?> GetById(int currencyId)
        {
            return await _context.Currencies.FindAsync(currencyId);
        }
    }
}
