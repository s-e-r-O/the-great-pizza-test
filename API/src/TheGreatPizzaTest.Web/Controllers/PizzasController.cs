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
        public async Task<IEnumerable<PizzaDto>> GetAsync()
        {
            return await _pizzaService.GetPizzasAsync();
        }
    }
}
