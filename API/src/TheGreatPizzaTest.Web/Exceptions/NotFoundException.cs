using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TheGreatPizzaTest.Web.Exceptions.Base;

namespace TheGreatPizzaTest.Web.Exceptions
{
    public class NotFoundException : HttpException
    {
        internal NotFoundException(string resource, string id) : base(HttpStatusCode.NotFound, $"{resource} with id {id} was not found.")
        {
        }
    }
}
