namespace TheGreatPizzaTest.Core.Entities.Base
{
    public abstract class Entity<TId> : Entity
    {
        public virtual TId Id { get; protected set; }
    }
}
