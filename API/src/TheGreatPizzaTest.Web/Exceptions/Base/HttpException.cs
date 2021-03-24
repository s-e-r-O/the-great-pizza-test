using System;
using System.Net;

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
