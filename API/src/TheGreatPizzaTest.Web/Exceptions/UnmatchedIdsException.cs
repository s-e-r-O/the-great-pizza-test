using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TheGreatPizzaTest.Web.Exceptions.Base;

namespace TheGreatPizzaTest.Web.Exceptions
{
    public class UnmatchedIdsException : HttpException
    {
        internal UnmatchedIdsException() : base(HttpStatusCode.BadRequest, "The id from the body and the route don't match.")
        {
        }
    }
}
