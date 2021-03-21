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
    public class PizzasController : ControllerBase
    {
        private readonly IPizzaService _pizzaService;

        public PizzasController(IPizzaService pizzaService)
        {
            _pizzaService = pizzaService;
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
            return await _pizzaService.GetPizzaByIdAsync(id);
        }
        
        [HttpPost]
        public async Task<PizzaDto> PostPizza([FromBody] PizzaDto pizza)
        {
            return await _pizzaService.Create(pizza);
        }

        [HttpPut("{id}")]
        public async Task PutPizza([FromRoute] int id, [FromBody] PizzaDto pizza)
        {
            await _pizzaService.Update(pizza);
        }

        [HttpDelete("{id}")]
        public async Task DeletePizza([FromRoute] int id)
        {
            await _pizzaService.Delete(id);
        }
    }
}
