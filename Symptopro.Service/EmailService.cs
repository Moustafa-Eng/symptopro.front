using Symptopro.Core.Entities;
using Symptopro.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Symptopro.Service
{
    public class EmailService : IEmailService
    {
        public async Task SendEmailAsync(Email email)
        {
            //var Client = new SmtpClient("smtp.gmail.com", 587);
            //Client.EnableSsl = true;
            //Client.Credentials = new NetworkCredential("mk2639087@gmail.com", "lzxsgppesitlnnrk");
            //Client.Send("mk2639087@gmail.com", email.To, email.Subject, email.Body);

            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("mk2639087@gmail.com", "lzxsgppesitlnnrk"),
                EnableSsl = true,
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress("mk2639087@gmail.com"),
                Subject = email.Subject,
                Body = email.Body,
                IsBodyHtml = true,
            };

            mailMessage.To.Add(email.To);

            await smtpClient.SendMailAsync(mailMessage);
        }
    }
}
