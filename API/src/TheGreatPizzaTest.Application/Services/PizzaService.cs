using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheGreatPizzaTest.Application.DTOs;
using TheGreatPizzaTest.Application.Interfaces;
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
    }
}
