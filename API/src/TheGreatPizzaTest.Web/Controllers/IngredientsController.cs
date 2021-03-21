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
using TheGreatPizzaTest.Web.Models;

namespace TheGreatPizzaTest.Web.Controllers
{
    /// <summary>
    /// Manage and request Ingredients 
    /// </summary>
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
        /// <remarks>Returns a list of all of the ingredients</remarks>
        /// <response code="200">Successsful operation</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<IngredientDto>>> GetAll()
        {
            return Ok(await _ingredientService.GetIngredientsAsync());
        }

        /// <summary>
        /// Find ingredient by ID
        /// </summary>
        /// <param name="id">ID of the ingredient to fetch</param>
        /// <response code="200">Successfull operation</response>
        /// <response code="404">Ingredient not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
        public async Task<ActionResult<IngredientDto>> GetById([FromRoute] int id)
        {
            var ingredient = await _ingredientService.GetIngredientByIdAsync(id);

            if (ingredient == null)
            {
                throw new NotFoundException("Ingredient", id.ToString());
            }
            return Ok(ingredient);
        }

        /// <summary>
        /// Create ingredient
        /// </summary>
        /// <param name="ingredient">Ingredient to be added</param>
        /// <response code="200">Successfull operation</response>
        /// <response code="400">Invalid input</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
        public async Task<ActionResult<IngredientDto>> PostIngredient([FromBody] CreateIngredientModel ingredient)
        {
            var newIngredient = await _ingredientService.Create(ingredient);
            return CreatedAtAction(nameof(GetById), new { id = newIngredient.Id }, newIngredient);
        }

        /// <summary>
        /// Update an existing ingredient
        /// </summary>
        /// <param name="id">ID of the ingredient to update</param>
        /// <param name="ingredient">Updated ingredient object</param>
        /// <response code="200">Successfull operation</response>
        /// <response code="400">Invalid ingredient supplied</response>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
        public async Task<ActionResult> PutIngredient([FromRoute] int id, [FromBody] UpdateIngredientModel ingredient)
        {
            if (id != ingredient.Id)
            {
                throw new UnmatchedIdsException();
            }
            await _ingredientService.Update(ingredient);
            return Ok();
        }

        /// <summary>
        /// Delete ingredient
        /// </summary>
        /// <param name="id">ID of the ingredient to delete</param>
        /// <response code="200">Successfull operation</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> DeleteIngredient([FromRoute] int id)
        {
            await _ingredientService.Delete(id);
            return Ok();
        }
    }
}
