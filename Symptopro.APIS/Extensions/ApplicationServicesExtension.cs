using Microsoft.AspNetCore.Mvc;
using Symptopro.APIS.Errors;
using Symptopro.Core.Interfaces;
using Symptopro.Core.Repositories;
using Symptopro.Core.Services;
using Symptopro.Repository;
using Symptopro.Service;

namespace Symptopro.APIS.Extensions
{
    public static class ApplicationServicesExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddHttpClient<IPredictionService, PredictionService>();


            services.Configure<ApiBehaviorOptions>(Options =>
            {
                Options.InvalidModelStateResponseFactory = (actionContext) =>
                {
                    var Errors = actionContext.ModelState.Where(p => p.Value.Errors.Count() > 0)
                    .SelectMany(P => P.Value.Errors).Select(E => E.ErrorMessage)
                    .ToArray();

                    var ValidationErrorResponse = new ApiValidationErrorResponse
                    {
                        Error = Errors
                    };
                    return new BadRequestObjectResult(ValidationErrorResponse);
                };
            });

            return services;
        }
    }
}
