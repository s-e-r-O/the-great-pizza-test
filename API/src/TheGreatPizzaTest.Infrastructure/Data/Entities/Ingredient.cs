using System;
using System.Collections.Generic;

#nullable disable

namespace TheGreatPizzaTest.Core.Entities
{
    public partial class Ingredient
    {
        public Ingredient()
        {
            PizzaToppings = new HashSet<PizzaTopping>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<PizzaTopping> PizzaToppings { get; set; }
    }
}
