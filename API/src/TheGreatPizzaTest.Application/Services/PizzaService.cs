using AutoMapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using TheGreatPizzaTest.Application.DTOs;
using TheGreatPizzaTest.Application.Exceptions;
using TheGreatPizzaTest.Application.Interfaces;
using TheGreatPizzaTest.Application.Models;
using TheGreatPizzaTest.Core.Entities;
using TheGreatPizzaTest.Core.Repositories;

namespace TheGreatPizzaTest.Application.Services
{
    public class PizzaService : IPizzaService
    {
        private readonly IMapper _mapper;
        private readonly IPizzaRepository _pizzaRepository;
        public PizzaService(IMapper mapper, IPizzaRepository pizzaRepository)
        {
            _mapper = mapper;
            _pizzaRepository = pizzaRepository;
        }
        public async Task<IEnumerable<PizzaDto>> GetPizzasAsync()
        {
            var pizzas = await _pizzaRepository.GetPizzasWithIngredientsAsync();
            return _mapper.Map<IEnumerable<PizzaDto>>(pizzas);
        }

        public async Task<PizzaDto> GetPizzaByIdAsync(int id)
        {
            var pizza = await _pizzaRepository.GetPizzaWithIngredientsAsync(id);
            return _mapper.Map<PizzaDto>(pizza);
        }

        public async Task<PizzaDto> Create(CreatePizzaModel pizza)
        {
            var mappedPizza = _mapper.Map<Pizza>(pizza);
            var newPizza = await _pizzaRepository.AddAsync(mappedPizza);
            return _mapper.Map<PizzaDto>(newPizza);
        }

        public async Task Update(UpdatePizzaModel pizza)
        {
            var editPizza = await _pizzaRepository.GetByIdAsync(pizza.Id.Value);
            if (editPizza == null)
            {
                throw new EntityCantBeLoadedException<Pizza>(pizza.Id.ToString());
            }
            _mapper.Map(pizza, editPizza);
            await _pizzaRepository.UpdateAsync(editPizza);
        }

        public async Task Delete(int id)
        {
            var deletePizza = await _pizzaRepository.GetByIdAsync(id);
            if (deletePizza == null)
            {
                throw new EntityCantBeLoadedException<Pizza>(id.ToString());
            }
            await _pizzaRepository.DeleteAsync(deletePizza);
        }
    }
}
