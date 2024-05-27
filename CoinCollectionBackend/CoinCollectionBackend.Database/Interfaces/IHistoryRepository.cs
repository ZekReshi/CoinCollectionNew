using CoinCollectionBackend.Database.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinCollectionBackend.Database.Interfaces
{
    public interface IHistoryRepository
    {
        Task<IEnumerable<HistoryEntry>> GetByCoin(Coin coin);
    }
}
