using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheGreatPizzaTest.Application.DTOs;
using TheGreatPizzaTest.Application.Interfaces;
using TheGreatPizzaTest.Core.Entities;
using TheGreatPizzaTest.Core.Repositories;

namespace TheGreatPizzaTest.Application.Services
{
    public class PizzaToppingService : IPizzaToppingService
    {
        private readonly IMapper _mapper;
        private readonly IPizzaToppingRepository _pizzaToppingRepository;

        public PizzaToppingService(IMapper mapper, IPizzaToppingRepository pizzaToppingRepository)
        {
            _mapper = mapper;
            _pizzaToppingRepository = pizzaToppingRepository;
        }

        public async Task<IEnumerable<IngredientDto>> GetToppingsForPizza(int pizzaId)
        {
            var toppings = await _pizzaToppingRepository.GetToppingsFromPizzaAsync(pizzaId);
            var ingredients = toppings.Select(pt => pt.Ingredient);
            return _mapper.Map<IEnumerable<IngredientDto>>(ingredients);

        }

        public async Task AddToppingToPizza(int pizzaId, int ingredientId)
        {
            await _pizzaToppingRepository.AddAsync(new PizzaTopping() { PizzaId = pizzaId, IngredientId = ingredientId });
        }

        public async Task DeleteToppingFromPizza(int pizzaId, int ingredientId)
        {
            await _pizzaToppingRepository.DeleteAsync(new PizzaTopping() { PizzaId = pizzaId, IngredientId = ingredientId });
        }
    }
}
