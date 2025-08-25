
using System.Collections.Generic;
using System.Threading.Tasks;
using Task.Models;


namespace DAL
{
    public interface IRequestRepository
    {
        Task<IEnumerable<Request>> GetAllAsync();
        Task<Request> GetByIdAsync(int id);
        Task<Request> AddAsync(Request request);
        Task<Request> UpdateAsync(Request request);
        Task<bool> DeleteAsync(int id);
    }
}

