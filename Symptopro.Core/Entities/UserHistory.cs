using Symptopro.Core.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Symptopro.Core.Entities
{
    public class UserHistory : BaseEntity
    {
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public string Action { get; set; }
        public DateTime ActionDate { get; set; }
    }
}
