using System.Net;
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
