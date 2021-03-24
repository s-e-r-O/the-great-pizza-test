using TheGreatPizzaTest.Core.Entities;
using TheGreatPizzaTest.Core.Specifications.Base;

namespace TheGreatPizzaTest.Core.Specifications
{
    public class ToppingFromPizzaAndIngredientSpecification : BaseSpecification<PizzaTopping>
    {
        public ToppingFromPizzaAndIngredientSpecification(int pizzaId, int ingredientId) 
            : base(p => p.PizzaId == pizzaId && p.IngredientId == ingredientId)
        {
        }
    }
}
