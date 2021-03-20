using System;
using System.Collections.Generic;

#nullable disable

namespace TheGreatPizzaTest.Core.Entities
{
    public partial class PizzaTopping
    {
        public int PizzaId { get; set; }
        public int IngredientId { get; set; }

        public virtual Ingredient Ingredient { get; set; }
        public virtual Pizza Pizza { get; set; }
    }
}
