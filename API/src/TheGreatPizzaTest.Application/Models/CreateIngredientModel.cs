using System.ComponentModel.DataAnnotations;

namespace TheGreatPizzaTest.Application.Models
{
    public class CreateIngredientModel
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}
