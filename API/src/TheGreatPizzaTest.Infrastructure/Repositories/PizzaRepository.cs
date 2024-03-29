﻿using System.Collections.Generic;
using System.Threading.Tasks;
using TheGreatPizzaTest.Core.Entities;
using TheGreatPizzaTest.Core.Repositories;
using TheGreatPizzaTest.Core.Specifications;
using TheGreatPizzaTest.Infrastructure.Data;
using TheGreatPizzaTest.Infrastructure.Repositories.Base;

namespace TheGreatPizzaTest.Infrastructure.Repositories
{
    public class PizzaRepository : Repository<Pizza>, IPizzaRepository
    {
        public PizzaRepository(TheGreatPizzaTestDBContext dbContext) : base(dbContext)
        {
        }

        public async Task<IReadOnlyList<Pizza>> GetPizzasWithIngredientsAsync()
        {
            var spec = new PizzaWithIngredientsSpecification();
            return await GetAsync(spec);
        }
        public async Task<Pizza> GetPizzaWithIngredientsAsync(int id)
        {
            var spec = new PizzaWithIngredientsSpecification(id);
            return await GetByIdAsync(spec);
        }
    }
}
