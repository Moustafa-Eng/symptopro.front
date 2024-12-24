using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Symptopro.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Symptopro.Repository.Data.Configurations
{
    internal class DoctorConfig : IEntityTypeConfiguration<Doctor>
    {
        public void Configure(EntityTypeBuilder<Doctor> builder)
        {
            builder.Property(d => d.Name)
            .IsRequired()
            .HasMaxLength(100);

            builder.Property(d => d.Specialty)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(d => d.ContactInfo)
                .HasMaxLength(200);

            builder.HasMany(d => d.Diseases)
                .WithMany()
                .UsingEntity(j => j.ToTable("DoctorDiseases"));
        }
    }
}
