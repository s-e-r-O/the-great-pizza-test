using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
