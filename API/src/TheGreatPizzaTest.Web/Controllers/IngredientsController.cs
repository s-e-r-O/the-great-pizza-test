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
        public async Task<ActionResult<IEnumerable<IngredientDto>>> GetAsync()
        {
            return Ok(await _ingredientService.GetIngredientsAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IngredientDto>> GetById([FromRoute] int id)
        {
            var ingredient = await _ingredientService.GetIngredientByIdAsync(id);

            if (ingredient == null)
            {
                throw new NotFoundException("Ingredient", id.ToString());
            }
            return Ok(ingredient);
        }

        [HttpPost]
        public async Task<ActionResult<IngredientDto>> PostPizza([FromBody] CreateIngredientModel ingredient)
        {
            var newIngredient = await _ingredientService.Create(ingredient);
            return CreatedAtAction(nameof(GetById), new { id = newIngredient.Id }, newIngredient);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutPizza([FromRoute] int id, [FromBody] UpdateIngredientModel ingredient)
        {
            if (id != ingredient.Id)
            {
                throw new UnmatchedIdsException();
            }
            await _ingredientService.Update(ingredient);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePizza([FromRoute] int id)
        {
            await _ingredientService.Delete(id);
            return Ok();
        }
    }
}
