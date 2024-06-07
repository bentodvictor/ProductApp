using ProductApp.Domain.Common;

namespace ProductApp.Domain.Interfaces;

public interface IBaseEntityRepository<T> where T : BaseEntity
{
    public Task<List<T>> GetAllAsync();

    public Task<T> GetByIdAsync(Guid id);

    public Task<bool> AddAsync(T entity);

    public Task<bool> UpdateAsync(T entity);

    public Task<bool> DeleteAsync(Guid id);
}