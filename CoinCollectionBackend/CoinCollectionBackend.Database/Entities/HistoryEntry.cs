using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinCollectionBackend.Database.Entities
{
    public class HistoryEntry
    {
        public int Id { get; set; }
        public int Currency { get; set; }
        public int CurrencyId { get; set; }
        public int Value { get; set; }
        public int Year { get; set; }
        public DateTime DateTime { get; set; }
        public double EntryValue { get; set; }
    }
}
