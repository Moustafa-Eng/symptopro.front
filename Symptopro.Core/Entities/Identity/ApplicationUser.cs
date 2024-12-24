using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Symptopro.Core.Entities.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; }
        public DateTime DateOfBirth { get; set; }

        public ICollection<MedicalReport> MedicalReports { get; set; } = new HashSet<MedicalReport>();
        public ICollection<Prediction> Predictions { get; set; } = new HashSet<Prediction>();
        public ICollection<UserHistory> UserHistories { get; set; } = new HashSet<UserHistory>();
    }
}
