using System.Collections.Generic;

namespace TheGreatPizzaTest.Application.DTOs
{
    public class PizzaDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<IngredientDto> Ingredients { get; set; }
    }
}
