using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PresidentWiki.DataAccess
{
    [Table("Presidents")]
    public class PresidentEntity
    {
        [Key]
        public int PresidentId { get; set; }

        [Required]
        public String Name { get; set; }

        [Required]
        public String Birthdate { get; set; }

        [Required]
        public String Birthplace { get; set; }

        [Required]
        public String Deathdate { get; set; }

        public String Deathplace { get; set; }
    }
}
