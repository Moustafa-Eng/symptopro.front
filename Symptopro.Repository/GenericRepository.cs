using Microsoft.EntityFrameworkCore;
using Symptopro.Core.Entities;
using Symptopro.Core.Repositories;
using Symptopro.Repository.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Symptopro.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly ApplicationDbContext _dbContext;

        public GenericRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }



        public async Task AddAsync(T Item)
        {
            await _dbContext.Set<T>().AddAsync(Item);
        }

        public void Delete(T Item)
        {
            _dbContext.Set<T>().Remove(Item);
        }

        public async Task<IReadOnlyList<T>> GetAllAsync()
        {
            return await _dbContext.Set<T>().ToListAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbContext.Set<T>().FindAsync(id);
        }

        public void Update(T Item)
        {
            _dbContext.Set<T>().Update(Item);
        }
    }
}
