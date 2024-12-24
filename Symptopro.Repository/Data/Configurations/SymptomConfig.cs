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
    internal class SymptomConfig : IEntityTypeConfiguration<Symptom>
    {
        public void Configure(EntityTypeBuilder<Symptom> builder)
        {
            builder.Property(s => s.Name)
            .IsRequired()
            .HasMaxLength(100);

        }
    }
}
