﻿using System.Collections.Generic;
using System.Threading.Tasks;
using TheGreatPizzaTest.Core.Entities;
using TheGreatPizzaTest.Core.Repositories;
using TheGreatPizzaTest.Core.Specifications;
using TheGreatPizzaTest.Infrastructure.Data;
using TheGreatPizzaTest.Infrastructure.Repositories.Base;

namespace TheGreatPizzaTest.Infrastructure.Repositories
{
    public class PizzaToppingRepository : Repository<PizzaTopping>, IPizzaToppingRepository
    {
        public PizzaToppingRepository(TheGreatPizzaTestDBContext dbContext) : base(dbContext)
        {
        }

        public async Task<PizzaTopping> GetToppingAsync(int pizzaId, int ingredientId)
        {
            var spec = new ToppingFromPizzaAndIngredientSpecification(pizzaId, ingredientId);
            return await GetByIdAsync(spec);
        }

        public async Task<IReadOnlyList<PizzaTopping>> GetToppingsFromPizzaAsync(int pizzaId)
        {
            var spec = new ToppingsFromPizzaSpecification(pizzaId);
            return await GetAsync(spec);
        }
    }
}
