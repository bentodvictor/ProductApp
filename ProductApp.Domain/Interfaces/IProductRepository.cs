using ProductApp.Domain.Entities;
using ProductApp.Domain.Interfaces;

namespace ProductApp.Application.interfaces;

public interface IProductRepository : IBaseEntityRepository<Product>
{
    public void CheckIfProductAlreadyExists(string name);
}