using TheGreatPizzaTest.Application.Exceptions.Base;
using TheGreatPizzaTest.Core.Entities.Base;

namespace TheGreatPizzaTest.Application.Exceptions
{
    public class EntityAlreadyExistsException<T> : ApplicationException where T : Entity
    {
        internal EntityAlreadyExistsException(string id) : base($"{typeof(T).Name} with id {id} already exists.")
        {
        }
    }
}
