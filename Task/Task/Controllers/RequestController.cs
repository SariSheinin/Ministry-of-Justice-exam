using Microsoft.AspNetCore.Mvc;
using BL;
using Task.Models;

namespace Task.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RequestController : ControllerBase
    {
        private readonly IRequestService _service;

        public RequestController(IRequestService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var requests = await _service.GetAllAsync();
            return Ok(requests);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var request = await _service.GetByIdAsync(id);
            if (request == null)
                return NotFound();
            return Ok(request);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Request request)
        {
            var newRequest = await _service.AddAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = newRequest.Id }, newRequest);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Request request)
        {
            if (id != request.Id) return BadRequest("המזהה לא תואם");
            var updated = await _service.UpdateAsync(request);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
