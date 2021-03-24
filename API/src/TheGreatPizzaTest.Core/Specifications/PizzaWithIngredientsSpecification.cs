using TheGreatPizzaTest.Core.Entities;
using TheGreatPizzaTest.Core.Specifications.Base;

namespace TheGreatPizzaTest.Core.Specifications
{
    public class PizzaWithIngredientsSpecification : BaseSpecification<Pizza>
    {
        public PizzaWithIngredientsSpecification(int id) : base(p => p.Id == id)
        {
            AddInclude(p => p.Ingredients);
        }

        public PizzaWithIngredientsSpecification() : base(null)
        {
            AddInclude(p => p.Ingredients);
        }

    }
}
