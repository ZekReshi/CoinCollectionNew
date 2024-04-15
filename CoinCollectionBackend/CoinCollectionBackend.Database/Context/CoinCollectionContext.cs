using CoinCollectionBackend.Database.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinCollectionBackend.Database.Context
{
    public class CoinCollectionContext(DbContextOptions<CoinCollectionContext> options) : DbContext(options)
    {
        public DbSet<Coin> Coins { get; set; }
        public DbSet<Currency> Currencies {  get; set; }
        public DbSet<HistoryEntry> HistoryEntries { get; set; }
    }
}
