using System.Net;
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
