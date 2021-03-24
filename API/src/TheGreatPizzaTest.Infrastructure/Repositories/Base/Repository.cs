using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TheGreatPizzaTest.Core.Entities.Base;
using TheGreatPizzaTest.Core.Repositories.Base;
using TheGreatPizzaTest.Core.Specifications.Base;
using TheGreatPizzaTest.Infrastructure.Data;

namespace TheGreatPizzaTest.Infrastructure.Repositories.Base
{
    public class Repository<T> : IRepository<T> where T : Entity
    {
        protected readonly TheGreatPizzaTestDBContext _dbContext;

        public Repository(TheGreatPizzaTestDBContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public async Task<IReadOnlyList<T>> GetAllAsync()
        {
            return await _dbContext.Set<T>().ToListAsync();
        }
        public async Task<IReadOnlyList<T>> GetAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbContext.Set<T>().Where(predicate).ToListAsync();
        }
        public async Task<IReadOnlyList<T>> GetAsync(ISpecification<T> spec)
        {
            return await SpecificationEvaluator<T>
                .GetQuery(_dbContext.Set<T>().AsQueryable(), spec)
                .ToListAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _dbContext.Set<T>().FindAsync(id);
        }
        public async Task<T> GetByIdAsync(ISpecification<T> spec)
        {
            return await SpecificationEvaluator<T>
                .GetQuery(_dbContext.Set<T>().AsQueryable(), spec)
                .SingleOrDefaultAsync();
        }

        public async Task<T> AddAsync(T entity)
        {
            _dbContext.Set<T>().Add(entity);
            await _dbContext.SaveChangesAsync();
            return entity;
        }

        public async Task UpdateAsync(T entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(T entity)
        {
            _dbContext.Set<T>().Remove(entity);
            await _dbContext.SaveChangesAsync();
        }
    }
}
