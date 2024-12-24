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
    internal class DiseaseConfig : IEntityTypeConfiguration<Disease>
    {
        public void Configure(EntityTypeBuilder<Disease> builder)
        {
            builder.Property(d => d.Name)
            .IsRequired()
            .HasMaxLength(100);

            builder.Property(d => d.Description)
                .HasMaxLength(500);

            builder.HasMany(d => d.Symptoms)
                .WithMany()
                .UsingEntity(j => j.ToTable("DiseaseSymptoms"));
        }
    }
}
