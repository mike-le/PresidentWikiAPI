using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PresidentWiki.DataAccess;

using Microsoft.EntityFrameworkCore;

namespace PresidentWiki
{
    [Route("Presidents")]
    public class ValuesController : Controller
    {
        private RDSContext _context;

        public ValuesController(RDSContext context) {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            if (!(_context.Presidents.Any()))
                return NotFound();
            List<PresidentEntity> presidents = await _context.Presidents
                     .OrderBy(p => p.Name)
                     .ToListAsync();

            return Ok(presidents);
        }
    }
}
