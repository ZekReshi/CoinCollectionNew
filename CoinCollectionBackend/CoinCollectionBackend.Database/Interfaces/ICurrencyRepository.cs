using CoinCollectionBackend.Database.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinCollectionBackend.Database.Interfaces
{
    public interface ICurrencyRepository
    {
        Task<IEnumerable<Currency>> GetAll();
        Task<Currency?> GetById(int currencyId);
    }
}
