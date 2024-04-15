using CoinCollectionBackend.Database.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinCollectionBackend.Database.Interfaces
{
    public interface ICoinRepository
    {
        Task<IEnumerable<Coin>> GetAll();
        Task<Coin?> GetById(int coinId);
        Task<IEnumerable<Coin>> GetByCurrency(int currencyId);
        Task<IDictionary<Currency, IEnumerable<Coin>>> GetGroupedByCurrency();
        Task<Coin> CreateCoin(Coin coin);
        Task<Coin> UpdateCoin(Coin coin);
        Task<Coin> DeleteCoin(Coin coin);
    }
}
