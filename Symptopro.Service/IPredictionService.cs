using Symptopro.APIS.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Symptopro.Service
{
    public interface IPredictionService
    {
        Task<PredictionResultDto> GetPredictionAndSave(SymptomDto symptomDto, string userId);
    }
}
