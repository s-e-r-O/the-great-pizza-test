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
    }
}
