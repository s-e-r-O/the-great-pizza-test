# The Great Pizza Test

### The Great Pizza Test is an exercise for Full Stack Developers, built with **ASP.NET CORE** and **SQL Server** (via EF Core) for the server, and with **Angular 11** with **Angular Material** for the web client.

<br>
<p align="center">
<img src="./Media/view-lists.gif" alt="launch" width="700">
</p>

<br>

## Some screenshots:

<div style="display:flex; justify-content: space-around;">
<div>
<p align="center">
<img src="./Media/add-pizza.gif" alt="add-pizza" width="550">
</p>
<p align="center">
<i>(Example: Adding a pizza)</i>
</p>
</div>

<div>
<p align="center">
<img src="./Media/toppings.gif" alt="add-topping" width="550">
</p>
<p align="center">
<i>(Example: Adding toppings on pizzas, by using existent ingredients)</i>
</p>
</div>
</div>

## Instructions:

- Run the following [SQL query](./SQL/schema.sql) to generate the database in SQL Server. It will delete any `TheGreatPizzaTestDB` DB that you had. _(The entities on the back-end were created using a DB-First approach)_
- Run the [`/API/src/TheGreatPizzaTest.Web`](./API/src/TheGreatPizzaTest.Web) project to start the API server. It should be running on `https://localhost:5001`.
- Run the Angular app located under [`/Web`](./Web). It should be running on `http://localhost:4200`.

## Troubleshooting

- If the DB does not connect, change the `ConnectionStrings:DefaultConnection` configuration under `appsettings.json`.
