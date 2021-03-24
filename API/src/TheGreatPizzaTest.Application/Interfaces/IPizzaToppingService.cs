using System.Collections.Generic;
using System.Threading.Tasks;
using TheGreatPizzaTest.Application.DTOs;

namespace TheGreatPizzaTest.Application.Interfaces
{
    public interface IPizzaToppingService
    {
        Task<IEnumerable<IngredientDto>> GetToppingsForPizza(int pizzaId);
        Task AddToppingToPizza(int pizzaId, int ingredientId);
        Task DeleteToppingFromPizza(int pizzaId, int ingredientId);
    }
}
