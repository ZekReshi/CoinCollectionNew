using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinCollectionBackend.Database.Entities
{
    public class Currency
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public Currency? ParentCurrency { get; set; }
        public int? ParentCurrencyId { get; set; }
    }
}
