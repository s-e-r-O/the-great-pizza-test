using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TheGreatPizzaTest.Core.Entities.Base
{
    public abstract class Entity<TId> : Entity
    {
        public virtual TId Id { get; protected set; }
    }
}
