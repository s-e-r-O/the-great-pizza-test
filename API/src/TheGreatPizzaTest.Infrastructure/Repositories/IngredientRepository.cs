﻿using TheGreatPizzaTest.Core.Entities;
using TheGreatPizzaTest.Core.Repositories;
using TheGreatPizzaTest.Infrastructure.Data;
using TheGreatPizzaTest.Infrastructure.Repositories.Base;

namespace TheGreatPizzaTest.Infrastructure.Repositories
{
    public class IngredientRepository : Repository<Ingredient>, IIngredientRepository
    {
        public IngredientRepository(TheGreatPizzaTestDBContext dbContext) : base(dbContext)
        {
        }
    }
}
