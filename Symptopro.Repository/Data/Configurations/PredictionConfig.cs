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
    internal class PredictionConfig : IEntityTypeConfiguration<Prediction>
    {
        public void Configure(EntityTypeBuilder<Prediction> builder)
        {
            builder.Property(p => p.CreatedAt)
           .IsRequired();

            builder.HasOne(p => p.User)
                .WithMany(u => u.Predictions)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(p => p.Disease)
                .WithMany()
                .HasForeignKey(p => p.DiseaseId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
