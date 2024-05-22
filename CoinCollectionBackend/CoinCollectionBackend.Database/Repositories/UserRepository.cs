using CoinCollectionBackend.Database.Context;
using CoinCollectionBackend.Database.Entities;
using CoinCollectionBackend.Database.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace CoinCollectionBackend.Database.Repositories
{
    public class UserRepository(CoinCollectionContext context) : IUserRepository
    {
        private readonly CoinCollectionContext _context = context;

        public async Task<User?> GetByName(string name)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Name == name);
        }
    }
}
