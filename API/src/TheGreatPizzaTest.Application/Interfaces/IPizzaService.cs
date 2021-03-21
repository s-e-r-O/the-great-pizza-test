using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TheGreatPizzaTest.Application.DTOs;

namespace TheGreatPizzaTest.Application.Interfaces
{
    public interface IPizzaService
    {
        Task<IEnumerable<PizzaDto>> GetPizzasAsync();
        Task<PizzaDto> GetPizzaByIdAsync(int id);
        Task<PizzaDto> Create(PizzaDto pizza);
        Task Update(PizzaDto pizza);
        Task Delete(int id);
    }
}
