using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using TheGreatPizzaTest.Core.Entities;

#nullable disable

namespace TheGreatPizzaTest.Infrastructure.Data
{
    public partial class TheGreatPizzaTestDBContext : DbContext
    {
        public TheGreatPizzaTestDBContext()
        {
        }

        public TheGreatPizzaTestDBContext(DbContextOptions<TheGreatPizzaTestDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Ingredient> Ingredients { get; set; }
        public virtual DbSet<Pizza> Pizzas { get; set; }
        public virtual DbSet<PizzaTopping> PizzaToppings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Ingredient>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Pizza>(entity =>
            {
                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
                entity.HasMany(e => e.Ingredients)
                    .WithMany(e => e.Pizzas)
                    .UsingEntity<PizzaTopping>(
                    j => j
                        .HasOne(pt => pt.Ingredient)
                        .WithMany(p => p.PizzaToppings)
                        .HasForeignKey(pt => pt.IngredientId),
                    j => j
                        .HasOne(pt => pt.Pizza)
                        .WithMany(p => p.PizzaToppings)
                        .HasForeignKey(pt => pt.PizzaId),
                    j =>
                    {
                        j.HasKey(pt => new { pt.PizzaId, pt.IngredientId })
                            .HasName("PK_PizzaTopping");

                        j.HasIndex(pt => pt.IngredientId, "IX_PizzaToppings_IngredientId");

                        j.HasIndex(pt => pt.PizzaId, "IX_PizzaToppings_PizzaId");
                    }
                    );
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
