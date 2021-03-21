using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheGreatPizzaTest.Application.Models
{
    public class UpdateIngredientModel
    {
        [Required]
        public int? Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
