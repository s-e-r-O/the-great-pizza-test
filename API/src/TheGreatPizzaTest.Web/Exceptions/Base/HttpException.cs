using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TheGreatPizzaTest.Application.Exceptions;

namespace TheGreatPizzaTest.Web.Exceptions.Base
{
    public class HttpException : Exception
    {
        internal HttpStatusCode StatusCode { get; private set; }
        internal HttpException(HttpStatusCode statusCode, string message)
            : base(message)
        {
            StatusCode = statusCode;
        }
    }
}
