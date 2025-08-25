using DAL.Data;
using Task.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DAL
{
    public class RequestRepository : IRequestRepository
    {
        private readonly AppDbContext _context;

        public RequestRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Request>> GetAllAsync()
        {
            return await _context.Requests.ToListAsync();
        }

        public async Task<Request> GetByIdAsync(int id)
        {
            return await _context.Requests.FindAsync(id);
        }

        public async Task<Request> AddAsync(Request request)
        {
            _context.Requests.Add(request);
            await _context.SaveChangesAsync();
            return request;
        }

        public async Task<Request> UpdateAsync(Request request)
        {
            _context.Requests.Update(request);
            await _context.SaveChangesAsync();
            return request;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var request = await _context.Requests.FindAsync(id);
            if (request == null) return false;

            _context.Requests.Remove(request);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

