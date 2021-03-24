using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheGreatPizzaTest.Application.DTOs;
using TheGreatPizzaTest.Application.Exceptions;
using TheGreatPizzaTest.Application.Interfaces;
using TheGreatPizzaTest.Core.Entities;
using TheGreatPizzaTest.Core.Repositories;

namespace TheGreatPizzaTest.Application.Services
{
    public class PizzaToppingService : IPizzaToppingService
    {
        private readonly IMapper _mapper;
        private readonly IPizzaToppingRepository _pizzaToppingRepository;
        private readonly IPizzaRepository _pizzaRepository;
        private readonly IIngredientRepository _ingredientRepository;

        public PizzaToppingService(
            IMapper mapper, 
            IPizzaToppingRepository pizzaToppingRepository, 
            IPizzaRepository pizzaRepository,
            IIngredientRepository ingredientRepository)
        {
            _mapper = mapper;
            _pizzaToppingRepository = pizzaToppingRepository;
            _pizzaRepository = pizzaRepository;
            _ingredientRepository = ingredientRepository;
        }

        public async Task<IEnumerable<IngredientDto>> GetToppingsForPizza(int pizzaId)
        {
            var pizza = await _pizzaRepository.GetByIdAsync(pizzaId);
            if (pizza == null)
            {
                throw new EntityCantBeLoadedException<Pizza>(pizzaId.ToString());
            }
            var toppings = await _pizzaToppingRepository.GetToppingsFromPizzaAsync(pizzaId);
            var ingredients = toppings.Select(pt => pt.Ingredient);
            return _mapper.Map<IEnumerable<IngredientDto>>(ingredients);

        }

        public async Task AddToppingToPizza(int pizzaId, int ingredientId)
        {
            var pizza = await _pizzaRepository.GetByIdAsync(pizzaId);
            if (pizza == null)
            {
                throw new EntityCantBeLoadedException<Pizza>(pizzaId.ToString());
            }
            var ingredient = await _ingredientRepository.GetByIdAsync(ingredientId);
            if (ingredient == null)
            {
                throw new EntityCantBeLoadedException<Ingredient>(ingredientId.ToString());
            }
            var topping = await _pizzaToppingRepository.GetToppingAsync(pizzaId, ingredientId);
            if (topping != null)
            {
                throw new EntityAlreadyExistsException<PizzaTopping>($"{{{pizzaId}, {ingredientId}}}");
            }
            await _pizzaToppingRepository.AddAsync(new PizzaTopping() { PizzaId = pizzaId, IngredientId = ingredientId });
        }

        public async Task DeleteToppingFromPizza(int pizzaId, int ingredientId)
        {
            var topping = await _pizzaToppingRepository.GetToppingAsync(pizzaId, ingredientId);
            if (topping == null)
            {
                throw new EntityCantBeLoadedException<PizzaTopping>($"{{{pizzaId}, {ingredientId}}}");
            }
            await _pizzaToppingRepository.DeleteAsync(topping);
        }
    }
}
