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
        /// <remarks>
        /// Get a list of all of the pizzas, each with a list of its ingredients.
        /// </remarks>
        /// <returns>A list of all of the pizzas, each with a list of its ingredients</returns>
        /// <response code="200">Returns a list of all of the pizzas, each with a list of its ingredients</response>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PizzaDto>>> GetAll()
        {
            return Ok(await _pizzaService.GetPizzasAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PizzaDto>> GetById([FromRoute] int id)
        {
            var pizza = await _pizzaService.GetPizzaByIdAsync(id);
            if (pizza == null)
            {
                throw new NotFoundException("Pizza", id.ToString());
            }
            return Ok(pizza);
        }

        [HttpPost]
        public async Task<ActionResult<PizzaDto>> PostPizza([FromBody] CreatePizzaModel pizza)
        {
            var newPizza = await _pizzaService.Create(pizza);
            return CreatedAtAction(nameof(GetById), new { id = newPizza.Id }, newPizza);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutPizza([FromRoute] int id, [FromBody] UpdatePizzaModel pizza)
        {
            if (id != pizza.Id)
            {
                throw new UnmatchedIdsException();
            }
            await _pizzaService.Update(pizza);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePizza([FromRoute] int id)
        {
            await _pizzaService.Delete(id);
            return Ok();
        }


        [HttpGet("{pizzaId}/toppings")]
        public async Task<ActionResult<IEnumerable<IngredientDto>>> GetToppingsForPizza([FromRoute] int pizzaId)
        {
            var pizza = await _pizzaService.GetPizzaByIdAsync(pizzaId);
            if (pizza == null)
            {
                throw new NotFoundException("Pizza", pizzaId.ToString());
            }

            return Ok(await _pizzaToppingService.GetToppingsForPizza(pizzaId));
        }
        
        [HttpPut("{pizzaId}/toppings/{ingredientId}")]
        public async Task<ActionResult> AddToppingToPizza([FromRoute] int pizzaId, [FromRoute] int ingredientId)
        {
            await _pizzaToppingService.AddToppingToPizza(pizzaId, ingredientId);
            return Ok();
        }
        
        [HttpDelete("{pizzaId}/toppings/{ingredientId}")]
        public async Task<ActionResult> DeleteToppingFromPizza([FromRoute] int pizzaId, [FromRoute] int ingredientId)
        {
            await _pizzaToppingService.DeleteToppingFromPizza(pizzaId, ingredientId);
            return Ok();
        }
    }
}
