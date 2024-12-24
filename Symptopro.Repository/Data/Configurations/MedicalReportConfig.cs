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
    internal class MedicalReportConfig : IEntityTypeConfiguration<MedicalReport>
    {
        public void Configure(EntityTypeBuilder<MedicalReport> builder)
        {
            builder.Property(m => m.FilePath)
            .IsRequired();

            builder.Property(m => m.AnalysisResult)
                .HasMaxLength(1000);

            builder.Property(m => m.UploadedAt)
                .IsRequired();

            builder.HasOne(m => m.User)
                .WithMany(u => u.MedicalReports)
                .HasForeignKey(m => m.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}
