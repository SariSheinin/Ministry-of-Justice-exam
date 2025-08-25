using DAL;
using Task.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BL
{
    public class RequestService : IRequestService
    {
        private readonly IRequestRepository _repository;

        public RequestService(IRequestRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<Request>> GetAllAsync() => _repository.GetAllAsync();

        public Task<Request> GetByIdAsync(int id) => _repository.GetByIdAsync(id);

        public Task<Request> AddAsync(Request request)
        {
            // אפשר לשים פה ולידציה לוגית נוספת
            return _repository.AddAsync(request);
        }

        public Task<Request> UpdateAsync(Request request) => _repository.UpdateAsync(request);

        public Task<bool> DeleteAsync(int id) => _repository.DeleteAsync(id);
    }
}

