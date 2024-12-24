using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Symptopro.Core.Entities;
using Symptopro.Core.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Symptopro.Repository.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options) { }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Symptom> Symptoms { get; set; }
        public DbSet<Disease> Diseases { get; set; }
        public DbSet<Prediction> Predictions { get; set; }
        public DbSet<Prediction> MedicalReports { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<UserHistory> UserHistories { get; set; }
    }
}
