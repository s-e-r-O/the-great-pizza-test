using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheGreatPizzaTest.Core.Entities;
using TheGreatPizzaTest.Core.Specifications.Base;

namespace TheGreatPizzaTest.Core.Specifications
{
    public class PizzaWithIngredientsSpecification : BaseSpecification<Pizza>
    {
        public PizzaWithIngredientsSpecification() : base(null)
        {
            AddInclude(p => p.Ingredients);
        }
    }
}
