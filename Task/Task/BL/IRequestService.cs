using DAL;
using Task.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BL
{
    public interface IRequestService
    {
        Task<IEnumerable<Request>> GetAllAsync();
        Task<Request> GetByIdAsync(int id);
        Task<Request> AddAsync(Request request);
        Task<Request> UpdateAsync(Request request);
        Task<bool> DeleteAsync(int id);
    }

}