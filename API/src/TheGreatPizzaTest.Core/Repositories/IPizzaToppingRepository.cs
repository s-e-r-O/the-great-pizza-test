using System.Collections.Generic;
using System.Threading.Tasks;
using TheGreatPizzaTest.Core.Entities;
using TheGreatPizzaTest.Core.Repositories.Base;

namespace TheGreatPizzaTest.Core.Repositories
{
    public interface IPizzaToppingRepository : IRepository<PizzaTopping>
    {
        Task<PizzaTopping> GetToppingAsync(int pizzaId, int ingredientId);
        Task<IReadOnlyList<PizzaTopping>> GetToppingsFromPizzaAsync(int pizzaId);
    }
}
