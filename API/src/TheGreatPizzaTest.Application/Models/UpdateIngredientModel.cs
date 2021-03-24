using System.ComponentModel.DataAnnotations;

namespace TheGreatPizzaTest.Application.Models
{
    public class UpdateIngredientModel
    {
        [Required]
        public int? Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}
