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

        [HttpGet("{sort}")]
        public async Task<ActionResult> Get(string sort)
        {
            if (!(_context.Presidents.Any()))
                return NotFound();

            List<PresidentEntity> presidents = new List<PresidentEntity>();
            if (sort.Equals("asc"))
            {
                presidents = await _context.Presidents
                     .OrderBy(p => p.Name)
                     .ToListAsync();
            } else if (sort.Equals("desc"))
            {
                presidents = await _context.Presidents
                     .OrderByDescending(p => p.Name)
                     .ToListAsync();
            }

            return Ok(presidents);
        }
    }
}
