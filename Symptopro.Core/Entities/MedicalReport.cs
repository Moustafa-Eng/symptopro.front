using Symptopro.Core.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Symptopro.Core.Entities
{
    public class MedicalReport : BaseEntity
    {
        public string UserId { get; set; }
        public string FilePath { get; set; }
        public string AnalysisResult { get; set; }
        public DateTime UploadedAt { get; set; }
        public ApplicationUser User { get; set; }
    }
}
