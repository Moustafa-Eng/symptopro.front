using Symptopro.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Symptopro.Core.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(Email email);
    }
}
