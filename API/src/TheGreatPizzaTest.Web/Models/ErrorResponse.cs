using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Net;

namespace TheGreatPizzaTest.Web.Models
{
    public class ErrorResponse
    {
        public HttpStatusCode Status { get; set; } = HttpStatusCode.InternalServerError;
        public string Message { get; set; } = "An unexpected error occurred.";

        public string ToJsonString()
        {
            return JsonConvert.SerializeObject(this, new JsonSerializerSettings() {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            });
        }
    }
}
