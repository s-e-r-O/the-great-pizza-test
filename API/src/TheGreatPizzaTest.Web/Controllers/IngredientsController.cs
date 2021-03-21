using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheGreatPizzaTest.Application.DTOs;
using TheGreatPizzaTest.Application.Interfaces;

namespace TheGreatPizzaTest.Web.Controllers
{
    [Produces("application/json")]
    [ApiController]
    [Route("[controller]")]
    public class IngredientsController : ControllerBase
    {
        private readonly IIngredientService _ingredientService;

        public IngredientsController(IIngredientService ingredientService)
        {
            _ingredientService = ingredientService;
        }

        /// <summary>
        /// Get all ingredients
        /// </summary>
        /// <remarks>
        /// Get a list of all of the ingredients.
        /// </remarks>
        /// <returns>A list of all of the ingredients</returns>
        /// <response code="200">Returns a list of all of the ingredients</response>
        [HttpGet]
        public async Task<IEnumerable<IngredientDto>> GetAsync()
        {
            return await _ingredientService.GetIngredientsAsync();
        }
        [HttpGet("{id}")]
        public async Task<IngredientDto> GetById([FromRoute] int id)
        {
            return await _ingredientService.GetIngredientByIdAsync(id);
        }

        [HttpPost]
        public async Task<IngredientDto> PostPizza([FromBody] IngredientDto ingredient)
        {
            return await _ingredientService.Create(ingredient);
        }

        [HttpPut("{id}")]
        public async Task PutPizza([FromRoute] int id, [FromBody] IngredientDto ingredient)
        {
            await _ingredientService.Update(ingredient);
        }

        [HttpDelete("{id}")]
        public async Task DeletePizza([FromRoute] int id)
        {
            await _ingredientService.Delete(id);
        }
    }
}
