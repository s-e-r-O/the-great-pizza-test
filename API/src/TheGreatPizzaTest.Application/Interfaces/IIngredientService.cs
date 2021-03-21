using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheGreatPizzaTest.Application.DTOs;
using TheGreatPizzaTest.Application.Models;

namespace TheGreatPizzaTest.Application.Interfaces
{
    public interface IIngredientService
    {
        Task<IEnumerable<IngredientDto>> GetIngredientsAsync();
        Task<IngredientDto> GetIngredientByIdAsync(int id);
        Task<IngredientDto> Create(CreateIngredientModel ingredient);
        Task Update(UpdateIngredientModel ingredient);
        Task Delete(int id);
    }
}
