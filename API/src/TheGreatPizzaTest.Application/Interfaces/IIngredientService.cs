using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheGreatPizzaTest.Application.DTOs;

namespace TheGreatPizzaTest.Application.Interfaces
{
    public interface IIngredientService
    {
        Task<IEnumerable<IngredientDto>> GetIngredientsAsync();
        Task<IngredientDto> GetIngredientByIdAsync(int id);
        Task<IngredientDto> Create(IngredientDto ingredient);
        Task Update(IngredientDto ingredient);
        Task Delete(int id);
    }
}
