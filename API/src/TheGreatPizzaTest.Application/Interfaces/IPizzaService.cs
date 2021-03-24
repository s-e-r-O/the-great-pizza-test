using System.Collections.Generic;
using System.Threading.Tasks;
using TheGreatPizzaTest.Application.DTOs;
using TheGreatPizzaTest.Application.Models;

namespace TheGreatPizzaTest.Application.Interfaces
{
    public interface IPizzaService
    {
        Task<IEnumerable<PizzaDto>> GetPizzasAsync();
        Task<PizzaDto> GetPizzaByIdAsync(int id);
        Task<PizzaDto> Create(CreatePizzaModel pizza);
        Task Update(UpdatePizzaModel pizza);
        Task Delete(int id);
    }
}
