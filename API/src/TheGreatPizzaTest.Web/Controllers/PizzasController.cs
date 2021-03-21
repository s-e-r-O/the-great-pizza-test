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
        public async Task<IEnumerable<PizzaDto>> GetAll()
        {
            return await _pizzaService.GetPizzasAsync();
        }

        [HttpGet("{id}")]
        public async Task<PizzaDto> GetById([FromRoute] int id)
        {
            var pizza = await _pizzaService.GetPizzaByIdAsync(id);
            if (pizza == null)
            {
                throw new NotFoundException("Pizza", id.ToString());
            }
            return pizza;
        }

        [HttpPost]
        public async Task<PizzaDto> PostPizza([FromBody] CreatePizzaModel pizza)
        {
            return await _pizzaService.Create(pizza);
        }

        [HttpPut("{id}")]
        public async Task PutPizza([FromRoute] int id, [FromBody] UpdatePizzaModel pizza)
        {
            if (id != pizza.Id)
            {
                throw new UnmatchedIdsException();
            }
            await _pizzaService.Update(pizza);
        }

        [HttpDelete("{id}")]
        public async Task DeletePizza([FromRoute] int id)
        {
            await _pizzaService.Delete(id);
        }


        [HttpGet("{pizzaId}/toppings")]
        public async Task<IEnumerable<IngredientDto>> GetToppingsForPizza([FromRoute] int pizzaId)
        {
            var pizza = await _pizzaService.GetPizzaByIdAsync(pizzaId);
            if (pizza == null)
            {
                throw new NotFoundException("Pizza", pizzaId.ToString());
            }

            return await _pizzaToppingService.GetToppingsForPizza(pizzaId);
        }
        
        [HttpPut("{pizzaId}/toppings/{ingredientId}")]
        public async Task AddToppingToPizza([FromRoute] int pizzaId, [FromRoute] int ingredientId)
        {
            await _pizzaToppingService.AddToppingToPizza(pizzaId, ingredientId);
        }
        
        [HttpDelete("{pizzaId}/toppings/{ingredientId}")]
        public async Task DeleteToppingFromPizza([FromRoute] int pizzaId, [FromRoute] int ingredientId)
        {
            await _pizzaToppingService.DeleteToppingFromPizza(pizzaId, ingredientId);
        }
    }
}
