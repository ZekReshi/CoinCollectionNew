using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinCollectionBackend.Database.Entities
{
    public class Coin
    {
        public int Id { get; set; }
        public int Value { get; set; }
        public int Year { get; set; }
        public required Currency Currency { get; set; }
        public int? CurrencyId { get; set; }
    }
}
