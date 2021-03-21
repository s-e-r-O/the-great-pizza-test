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
            var pizza = await _pizzaRepository.GetByIdAsync(id);
            return _mapper.Map<PizzaDto>(pizza);
        }

        public async Task<PizzaDto> Create(PizzaDto pizza)
        {
            var mappedPizza = _mapper.Map<Pizza>(pizza);
            var newPizza = await _pizzaRepository.AddAsync(mappedPizza);
            return _mapper.Map<PizzaDto>(newPizza);
        }

        public async Task Update(PizzaDto pizza)
        {
            var editPizza = await _pizzaRepository.GetByIdAsync(pizza.Id);
            _mapper.Map(pizza, editPizza);
            await _pizzaRepository.UpdateAsync(editPizza);
        }

        public async Task Delete(int id)
        {
            var deletePizza = await _pizzaRepository.GetByIdAsync(id);
            await _pizzaRepository.DeleteAsync(deletePizza);
        }
    }
}
