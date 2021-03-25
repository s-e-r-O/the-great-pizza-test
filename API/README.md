# The Great Pizza Test - API

- This project was generated with [ASP.NET Core](https://github.com/dotnet/aspnetcore) in .NET 5.
- [EF Core](https://docs.microsoft.com/en-us/ef/core/) was used as ORM with SQL Server, using a DB-First approach.
- [Swagger](https://swagger.io) was used to document API endpoints.

# Instructions

- Run the [`TheGreatPizzaTest.Web`](./src/TheGreatPizzaTest.Web) project to start the API server. It should be running on `https://localhost:5001`.

# Troubleshooting

- If the database does not connect, please change the `ConnectionStrings:DefaultConnection` configuration under [`appsettings.Development.json`](./src/TheGreatPizzaTest.Web/appsettings.Development.json) accordingly.
- If your front-end is running in a url other than `http://localhost:4200`, please change the `AllowedOrigins` configuration under [`appsettings.Development.json`](./src/TheGreatPizzaTest.Web/appsettings.Development.json) accordingly.
