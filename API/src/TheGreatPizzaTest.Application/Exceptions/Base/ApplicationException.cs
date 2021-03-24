using System;

namespace TheGreatPizzaTest.Application.Exceptions.Base
{
    public class ApplicationException : Exception
    {
        internal ApplicationException(string message) : base(message)
        {
        }
    }
}
