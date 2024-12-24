using Symptopro.Core.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Symptopro.Core.Entities
{
    public class Prediction : BaseEntity
    {
        public string UserId { get; set; }
        public int DiseaseId { get; set; }
        public Disease Disease { get; set; }
        public DateTime CreatedAt { get; set; }

        public ApplicationUser User { get; set; }
    }
}
