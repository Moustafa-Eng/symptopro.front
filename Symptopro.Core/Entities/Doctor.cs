using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Symptopro.Core.Entities
{
    public class Doctor : BaseEntity
    {
        public string Name { get; set; }
        public string Specialty { get; set; }
        public string ContactInfo { get; set; }
        public ICollection<Disease> Diseases { get; set; } = new HashSet<Disease>();
    }
}
