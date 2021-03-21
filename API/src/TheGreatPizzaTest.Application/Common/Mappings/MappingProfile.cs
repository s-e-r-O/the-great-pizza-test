using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheGreatPizzaTest.Application.DTOs;
using TheGreatPizzaTest.Application.Models;
using TheGreatPizzaTest.Core.Entities;

namespace TheGreatPizzaTest.Application.Common.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Pizza, PizzaDto>();
            CreateMap<Ingredient, IngredientDto>();
            
            CreateMap<CreatePizzaModel, Pizza>();
            CreateMap<UpdatePizzaModel, Pizza>();
            CreateMap<CreateIngredientModel, Ingredient>();
            CreateMap<UpdateIngredientModel, Ingredient>();
        }
    }
}
