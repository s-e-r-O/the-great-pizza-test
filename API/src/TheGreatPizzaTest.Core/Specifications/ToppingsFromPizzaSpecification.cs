using TheGreatPizzaTest.Core.Entities;
using TheGreatPizzaTest.Core.Specifications.Base;

namespace TheGreatPizzaTest.Core.Specifications
{
    public class ToppingsFromPizzaSpecification : BaseSpecification<PizzaTopping>
    {
        public ToppingsFromPizzaSpecification(int pizzaId) : base(p => p.PizzaId == pizzaId)
        {
            AddInclude(p => p.Ingredient);
        }
    }
}
