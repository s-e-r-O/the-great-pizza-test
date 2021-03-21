using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TheGreatPizzaTest.Web.Exceptions;
using TheGreatPizzaTest.Web.Exceptions.Base;
using TheGreatPizzaTest.Web.Models;

namespace TheGreatPizzaTest.Web.Middlewares
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception exception)
            {
                await HandleExceptionAsync(context, exception);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var errorResponse = new ErrorResponse();
            if (exception is HttpException httpException)
            {
                errorResponse.Status = httpException.StatusCode;
                errorResponse.Message = httpException.Message;
            }
            if (exception is Application.Exceptions.Base.ApplicationException appException)
            {
                errorResponse.Message = appException.Message;
            }
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)errorResponse.Status;
            await context.Response.WriteAsync(errorResponse.ToJsonString());
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class MiddlewareExtensions
    {
        public static IApplicationBuilder UseGlobalExceptionHandler(this IApplicationBuilder builder)
        {
            builder.UseMiddleware<ExceptionHandlingMiddleware>();
            return builder;
        }
    }
}
