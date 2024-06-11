using Microsoft.EntityFrameworkCore;
using ProductApp.Domain.Common;
using ProductApp.Domain.Interfaces;
using ProductApp.Infrastructure.Data;

namespace ProductApp.Infrastructure.Repositories;

public class BaseEntityRepository<T> : IBaseEntityRepository<T> where T : BaseEntity
{
    private readonly ProductContext _productContext;

    public BaseEntityRepository(ProductContext productContext)
    {
        _productContext = productContext;
    }

    public async Task<bool> AddAsync(T entity)
    {
        await _productContext.AddAsync(entity);

        return await _productContext.SaveChangesAsync() > 0 ? true : false;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var productEntity = await _productContext.Set<T>().FindAsync(id);

        if (productEntity != null)
        {
            _productContext.Set<T>().Remove(productEntity);
        }

        return await _productContext.SaveChangesAsync() > 0 ? true : false;
    }

    public async Task<List<T>> GetAllAsync()
    {
        return await _productContext.Set<T>().ToListAsync();
    }

    public async Task<T> GetByIdAsync(Guid id)
    {
        return await _productContext.Set<T>().FindAsync(id);
    }

    public async Task<bool> UpdateAsync(T entity)
    {
        var productEntity = await _productContext.Set<T>().FindAsync(entity.Id);

        if (productEntity != null)
        {
            // Detach the existing entity
            _productContext.Entry(productEntity).State = EntityState.Detached;
        }

        // Attach the updated entity and mark it as modified
        _productContext.Set<T>().Attach(entity);
        _productContext.Entry(entity).State = EntityState.Modified;

        return await _productContext.SaveChangesAsync() > 0 ? true : false;
    }
}