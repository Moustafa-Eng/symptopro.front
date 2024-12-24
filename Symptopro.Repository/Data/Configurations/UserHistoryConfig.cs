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
    internal class UserHistoryConfig : IEntityTypeConfiguration<UserHistory>
    {
        public void Configure(EntityTypeBuilder<UserHistory> builder)
        {
            builder.Property(h => h.Action)
            .IsRequired()
            .HasMaxLength(200);

            builder.Property(h => h.ActionDate)
                .IsRequired();

            builder.HasOne(h => h.User)
                .WithMany(u => u.UserHistories)
                .HasForeignKey(h => h.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
