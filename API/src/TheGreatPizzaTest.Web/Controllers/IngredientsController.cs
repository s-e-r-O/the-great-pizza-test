using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TheGreatPizzaTest.Application.DTOs;
using TheGreatPizzaTest.Application.Interfaces;
using TheGreatPizzaTest.Application.Models;
using TheGreatPizzaTest.Web.Exceptions;

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
            var ingredient = await _ingredientService.GetIngredientByIdAsync(id);

            if (ingredient == null)
            {
                throw new NotFoundException("Ingredient", id.ToString());
            }
            return ingredient;
        }

        [HttpPost]
        public async Task<IngredientDto> PostPizza([FromBody] CreateIngredientModel ingredient)
        {
            return await _ingredientService.Create(ingredient);
        }

        [HttpPut("{id}")]
        public async Task PutPizza([FromRoute] int id, [FromBody] UpdateIngredientModel ingredient)
        {
            if (id != ingredient.Id)
            {
                throw new UnmatchedIdsException();
            }
            await _ingredientService.Update(ingredient);
        }

        [HttpDelete("{id}")]
        public async Task DeletePizza([FromRoute] int id)
        {
            await _ingredientService.Delete(id);
        }
    }
}
