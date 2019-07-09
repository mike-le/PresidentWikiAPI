using Microsoft.EntityFrameworkCore;

namespace PresidentWiki.DataAccess
{
    public class RDSContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }

        public RDSContext(DbContextOptions<RDSContext> options) : base(options)
        {
        }

        public DbSet<PresidentEntity> Presidents { get; set; }
    }
}