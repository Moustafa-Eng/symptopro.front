using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Symptopro.Core.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Symptopro.Repository.Identity.Configurations
{
    internal class ApplicationUserConfig : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            builder.Property(u => u.FullName)
           .IsRequired()
           .HasMaxLength(100);

            builder.Property(u => u.DateOfBirth)
                .IsRequired();

            builder.HasMany(u => u.UserHistories)
                .WithOne(h => h.User)
                .HasForeignKey(h => h.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
