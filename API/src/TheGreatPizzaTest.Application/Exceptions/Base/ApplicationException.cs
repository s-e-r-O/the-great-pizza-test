using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheGreatPizzaTest.Application.Exceptions.Base
{
    public class ApplicationException : Exception
    {
        internal ApplicationException(string message) : base(message)
        {
        }
    }
}
