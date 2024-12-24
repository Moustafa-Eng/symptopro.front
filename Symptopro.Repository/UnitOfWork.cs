using Symptopro.Core.Entities;
using Symptopro.Core.Interfaces;
using Symptopro.Core.Repositories;
using Symptopro.Repository.Data;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Symptopro.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _dbContext;
        private Hashtable _repositories;

        public UnitOfWork(ApplicationDbContext dbContext)
        {
            _repositories = new Hashtable();
            _dbContext = dbContext;
        }
        public async Task<int> CompleteAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }

        public ValueTask DisposeAsync()
        {
            return _dbContext.DisposeAsync();
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            var type = typeof(TEntity).Name;
            if(!_repositories.ContainsKey(type))
            {
                var repositories = new GenericRepository<TEntity>(_dbContext);
                _repositories.Add(type, repositories);
            }
            return _repositories[type] as GenericRepository<TEntity>;
        }
    }
}
