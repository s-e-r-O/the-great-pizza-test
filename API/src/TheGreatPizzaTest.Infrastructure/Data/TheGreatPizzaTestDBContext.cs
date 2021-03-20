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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=TheGreatPizzaTestDB;Trusted_Connection=True;");
            }
        }

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
            });

            modelBuilder.Entity<PizzaTopping>(entity =>
            {
                entity.HasKey(e => new { e.PizzaId, e.IngredientId })
                    .HasName("PK_PizzaTopping");

                entity.HasIndex(e => e.IngredientId, "IX_PizzaToppings_IngredientId");

                entity.HasIndex(e => e.PizzaId, "IX_PizzaToppings_PizzaId");

                entity.HasOne(d => d.Ingredient)
                    .WithMany(p => p.PizzaToppings)
                    .HasForeignKey(d => d.IngredientId);

                entity.HasOne(d => d.Pizza)
                    .WithMany(p => p.PizzaToppings)
                    .HasForeignKey(d => d.PizzaId);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
