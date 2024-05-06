using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoinCollectionBackend.Database.Entities
{
    public class User
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string PWHash { get; set; }
        public required string Salt { get; set; }
    }
}
