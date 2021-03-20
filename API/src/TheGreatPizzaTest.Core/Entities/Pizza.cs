using System;
using System.Collections.Generic;
using TheGreatPizzaTest.Core.Entities.Base;

#nullable disable

namespace TheGreatPizzaTest.Core.Entities
{
    public partial class Pizza : Entity
    {
        public Pizza()
        {
            PizzaToppings = new HashSet<PizzaTopping>();
        }

        public string Name { get; set; }

        public virtual ICollection<PizzaTopping> PizzaToppings { get; set; }
    }
}
