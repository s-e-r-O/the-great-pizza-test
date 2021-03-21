﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheGreatPizzaTest.Core.Entities;
using TheGreatPizzaTest.Core.Repositories.Base;

namespace TheGreatPizzaTest.Core.Repositories
{
    public interface IPizzaRepository : IRepository<Pizza>
    {
        Task<IReadOnlyList<Pizza>> GetPizzasWithIngredientsAsync();
        Task<Pizza> GetPizzaWithIngredientsAsync(int id);
    }
}
