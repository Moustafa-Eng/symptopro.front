using Microsoft.AspNetCore.Identity;
using Symptopro.Core.Entities.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Symptopro.Core.Services
{
    public interface ITokenService
    {
        public Task<string> CreateTokenAsync(ApplicationUser user, UserManager<ApplicationUser> userManager);
    }
}
