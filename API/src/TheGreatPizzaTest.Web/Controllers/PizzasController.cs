using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using TheGreatPizzaTest.Application.DTOs;
using TheGreatPizzaTest.Application.Interfaces;
using TheGreatPizzaTest.Application.Models;
using TheGreatPizzaTest.Web.Exceptions;
using TheGreatPizzaTest.Web.Models;

namespace TheGreatPizzaTest.Web.Controllers
{
    /// <summary>
    /// Manage and request Pizzas and Pizza Toppings 
    /// </summary>
    [Produces("application/json")]
    [ApiController]
    [Route("[controller]")]
    public class PizzasController : ControllerBase
    {
        private readonly IPizzaService _pizzaService;
        private readonly IPizzaToppingService _pizzaToppingService;

        public PizzasController(IPizzaService pizzaService, IPizzaToppingService pizzaToppingService)
        {
            _pizzaService = pizzaService;
            _pizzaToppingService = pizzaToppingService;
        }

        /// <summary>
        /// Get all pizzas
        /// </summary>
        /// <remarks>Returns a list of all of the pizzas and their respective ingredients</remarks>
        /// <response code="200">Successsful operation</response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<PizzaDto>>> GetAll()
        {
            return Ok(await _pizzaService.GetPizzasAsync());
        }

        /// <summary>
        /// Find pizza by ID
        /// </summary>
        /// <remarks>Returns the pizza specified and its respective ingredients</remarks>
        /// <param name="id">ID of the pizza to fetch</param>
        /// <response code="200">Successfull operation</response>
        /// <response code="404">Pizza not found</response>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
        public async Task<ActionResult<PizzaDto>> GetById([FromRoute] int id)
        {
            var pizza = await _pizzaService.GetPizzaByIdAsync(id);
            if (pizza == null)
            {
                throw new NotFoundException("Pizza", id.ToString());
            }
            return Ok(pizza);
        }

        /// <summary>
        /// Create pizza
        /// </summary>
        /// <param name="pizza">Pizza to be added</param>
        /// <response code="200">Successfull operation</response>
        /// <response code="400">Invalid input</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
        public async Task<ActionResult<PizzaDto>> PostPizza([FromBody] CreatePizzaModel pizza)
        {
            var newPizza = await _pizzaService.Create(pizza);
            return CreatedAtAction(nameof(GetById), new { id = newPizza.Id }, newPizza);
        }

        /// <summary>
        /// Update an existing pizza
        /// </summary>
        /// <param name="id">ID of the pizzato update</param>
        /// <param name="pizza">Updated pizza object</param>
        /// <response code="200">Successfull operation</response>
        /// <response code="400">Invalid pizza supplied</response>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorResponse))]
        public async Task<ActionResult> PutPizza([FromRoute] int id, [FromBody] UpdatePizzaModel pizza)
        {
            if (id != pizza.Id)
            {
                throw new UnmatchedIdsException();
            }
            await _pizzaService.Update(pizza);
            return Ok();
        }

        /// <summary>
        /// Delete pizza
        /// </summary>
        /// <param name="id">ID of the pizza to delete</param>
        /// <response code="200">Successfull operation</response>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> DeletePizza([FromRoute] int id)
        {
            await _pizzaService.Delete(id);
            return Ok();
        }

        /// <summary>
        /// Find toppings by pizza ID
        /// </summary>
        /// <remarks>Returns a list of ingredients from a the specified pizza</remarks>
        /// <param name="pizzaId">ID of the pizza whose ingredients we want to fetch</param>
        /// <response code="200">Successfull operation</response>
        /// <response code="404">Pizza not found</response>
        [HttpGet("{pizzaId}/Toppings")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(ErrorResponse))]
        public async Task<ActionResult<IEnumerable<IngredientDto>>> GetToppingsForPizza([FromRoute] int pizzaId)
        {
            var pizza = await _pizzaService.GetPizzaByIdAsync(pizzaId);
            if (pizza == null)
            {
                throw new NotFoundException("Pizza", pizzaId.ToString());
            }

            return Ok(await _pizzaToppingService.GetToppingsForPizza(pizzaId));
        }

        /// <summary>
        /// Add topping to pizza
        /// </summary>
        /// <remarks>The pizza and the ingredient need to be created previously</remarks>
        /// <param name="pizzaId">ID of the pizza</param>
        /// <param name="ingredientId">ID of the ingredient</param>
        /// <response code="200">Successfull operation</response>
        [HttpPut("{pizzaId}/Toppings/{ingredientId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> AddToppingToPizza([FromRoute] int pizzaId, [FromRoute] int ingredientId)
        {
            await _pizzaToppingService.AddToppingToPizza(pizzaId, ingredientId);
            return Ok();
        }

        /// <summary>
        /// Delete topping from pizza
        /// </summary>
        /// <param name="pizzaId">ID of the pizza</param>
        /// <param name="ingredientId">ID of the ingredient</param>
        /// <response code="200">Successfull operation</response>
        [HttpDelete("{pizzaId}/Toppings/{ingredientId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult> DeleteToppingFromPizza([FromRoute] int pizzaId, [FromRoute] int ingredientId)
        {
            await _pizzaToppingService.DeleteToppingFromPizza(pizzaId, ingredientId);
            return Ok();
        }
    }
}
