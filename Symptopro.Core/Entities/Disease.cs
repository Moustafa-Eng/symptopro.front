using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Symptopro.Core.Entities
{
    public class Disease : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public ICollection<Symptom> Symptoms { get; set; } = new HashSet<Symptom>();
    }
}
