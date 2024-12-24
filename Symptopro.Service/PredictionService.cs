using Symptopro.APIS.DTOs;
using Symptopro.Core.Entities;
using Symptopro.Core.Interfaces;
using Symptopro.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace Symptopro.Service
{
    public class PredictionService : IPredictionService
    {
        private readonly HttpClient _httpClient;
        private readonly IUnitOfWork _unitOfWork;

        public PredictionService(HttpClient httpClient, IUnitOfWork unitOfWork)
        {
            _httpClient = httpClient;
            _unitOfWork = unitOfWork;
        }
        public async Task<PredictionResultDto> GetPredictionAndSave(SymptomDto symptomDto, string userId)
        {
            var response = await _httpClient.PostAsJsonAsync("http://fastapi-url/predict", symptomDto);

            if (!response.IsSuccessStatusCode)
                return null;

            var predictionResult = await response.Content.ReadFromJsonAsync<PredictionResultDto>();

            if(userId != null)
            {
                //  Save In Predictions
                //var prediction = new Prediction
                //{
                //    DiseaseId = predictionResult.,
                //    //Confidence = predictionResult.Confidence,
                //    Symptoms = string.Join(", ", symptomDto.Symptoms),
                //    UserId = userId,
                //    CreatedAt = DateTime.UtcNow
                //};
                //await _predictionRepository.AddAsync(prediction);

                // Save In UserHistory
                var userHistory = new UserHistory
                {
                    UserId = userId,
                    Action = $"Prediction: {predictionResult.Disease}",
                    ActionDate = DateTime.UtcNow
                };
                await _unitOfWork.Repository<UserHistory>().AddAsync(userHistory);
            }

            

            return predictionResult;
        }
    }
}
