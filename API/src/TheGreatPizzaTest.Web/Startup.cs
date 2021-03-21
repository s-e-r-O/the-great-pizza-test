using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using TheGreatPizzaTest.Application.Common.Mappings;
using TheGreatPizzaTest.Application.Interfaces;
using TheGreatPizzaTest.Application.Services;
using TheGreatPizzaTest.Core.Repositories;
using TheGreatPizzaTest.Core.Repositories.Base;
using TheGreatPizzaTest.Infrastructure.Data;
using TheGreatPizzaTest.Infrastructure.Repositories;
using TheGreatPizzaTest.Infrastructure.Repositories.Base;
using TheGreatPizzaTest.Web.Exceptions;
using TheGreatPizzaTest.Web.Middlewares;

namespace Presentation
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

            ConfigureModelBindingExceptionHandling(services);

            services.AddSwaggerGen(c => {
                string xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                string xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });
            
            // Add Application Layer
            services.AddAutoMapper(cfg => {
                cfg.AddProfile<MappingProfile>();
            });
            services.AddScoped<IPizzaService, PizzaService>();
            services.AddScoped<IIngredientService, IngredientService>();
            services.AddScoped<IPizzaToppingService, PizzaToppingService>();

            // Add Infrastructure Layer
            services.AddDbContext<TheGreatPizzaTestDBContext>(c =>
                c.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<IPizzaRepository, PizzaRepository>();
            services.AddScoped<IIngredientRepository, IngredientRepository>();
            services.AddScoped<IPizzaToppingRepository, PizzaToppingRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseGlobalExceptionHandler();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "The Great Pizza Test API");
            });
        }

        private void ConfigureModelBindingExceptionHandling(IServiceCollection services)
        {
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    ValidationProblemDetails error = actionContext.ModelState
                        .Where(e => e.Value.Errors.Count > 0)
                        .Select(e => new ValidationProblemDetails(actionContext.ModelState)).FirstOrDefault();

                    throw new HttpException(
                        HttpStatusCode.BadRequest, 
                        string.Join(" ", error.Errors.SelectMany(e => e.Value).ToArray())
                    );
                };
            });
        }
    }
}
