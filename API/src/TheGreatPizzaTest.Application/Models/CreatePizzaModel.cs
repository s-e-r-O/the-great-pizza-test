using System.ComponentModel.DataAnnotations;

namespace TheGreatPizzaTest.Application.Models
{
    public class CreatePizzaModel
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
    }
}
