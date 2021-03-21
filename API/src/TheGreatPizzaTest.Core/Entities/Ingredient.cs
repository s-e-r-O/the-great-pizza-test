using System;
using System.Collections.Generic;
using TheGreatPizzaTest.Core.Entities.Base;

#nullable disable

namespace TheGreatPizzaTest.Core.Entities
{
    public partial class Ingredient : Entity
    {
        public Ingredient()
        {
            PizzaToppings = new HashSet<PizzaTopping>();
            Pizzas = new HashSet<Pizza>();
        }
        public string Name { get; set; }

        public virtual ICollection<PizzaTopping> PizzaToppings { get; set; }
        public virtual ICollection<Pizza> Pizzas { get; set; }
    }
}
