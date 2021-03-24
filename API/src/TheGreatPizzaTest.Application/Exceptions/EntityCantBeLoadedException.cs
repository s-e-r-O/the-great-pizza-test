using TheGreatPizzaTest.Application.Exceptions.Base;
using TheGreatPizzaTest.Core.Entities.Base;

namespace TheGreatPizzaTest.Application.Exceptions
{
    public class EntityCantBeLoadedException<T> : ApplicationException where T : Entity
    {
        public EntityCantBeLoadedException(string id) : base($"{typeof(T).Name} with id {id} could not be loaded.")
        {

        }
    }
}
