-- Populate the database with example data (and some pizzas)

INSERT INTO [dbo].[Pizzas]([Name])
VALUES (N'Hawaian'), (N'Peperoni'), (N'Irish')

INSERT INTO [dbo].[Ingredients]([Name])
VALUES (N'Ham'), (N'Pineapple'), (N'Peperoni'), (N'Potatoes'), (N'Cabbage')

INSERT INTO [dbo].[PizzaToppings]([PizzaId], [IngredientId])
VALUES (1, 1), (1, 2), (2, 3), (3, 4), (3, 5)
GO