﻿using AutoMapper;
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
    public class IngredientService : IIngredientService
    {
        private readonly IMapper _mapper;
        private readonly IIngredientRepository _ingredientRepository;
        public IngredientService(IMapper mapper, IIngredientRepository ingredientRepository)
        {
            _mapper = mapper;
            _ingredientRepository = ingredientRepository;
        }

        public async Task<IEnumerable<IngredientDto>> GetIngredientsAsync()
        {
            var ingredients = await _ingredientRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<IngredientDto>>(ingredients);
        }
        public async Task<IngredientDto> GetIngredientByIdAsync(int id)
        {
            var ingredient = await _ingredientRepository.GetByIdAsync(id);
            return _mapper.Map<IngredientDto>(ingredient);
        }

        public async Task<IngredientDto> Create(CreateIngredientModel ingredient)
        {
            var mappedIngredient = _mapper.Map<Ingredient>(ingredient);
            var newIngredient = await _ingredientRepository.AddAsync(mappedIngredient);
            return _mapper.Map<IngredientDto>(newIngredient);
        }

        public async Task Update(UpdateIngredientModel ingredient)
        {
            var editIngredient = await _ingredientRepository.GetByIdAsync(ingredient.Id.Value);
            if (editIngredient == null)
            {
                throw new EntityCantBeLoadedException<Ingredient>(ingredient.Id.ToString());
            }
            _mapper.Map(ingredient, editIngredient);
            await _ingredientRepository.UpdateAsync(editIngredient);
        }

        public async Task Delete(int id)
        {
            var deleteIngredient = await _ingredientRepository.GetByIdAsync(id);
            if (deleteIngredient == null)
            {
                throw new EntityCantBeLoadedException<Ingredient>(id.ToString());
            }
            await _ingredientRepository.DeleteAsync(deleteIngredient);
        }
    }
}
