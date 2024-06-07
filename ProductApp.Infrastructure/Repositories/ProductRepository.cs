using ProductApp.Application.interfaces;
using ProductApp.Domain.Entities;
using ProductApp.Domain.Exceptions;
using ProductApp.Infrastructure.Data;

namespace ProductApp.Infrastructure.Repositories;

public class ProductRepository : BaseEntityRepository<Product>, IProductRepository
{
    public readonly ProductContext _context;

    public ProductRepository(ProductContext context) : base(context)
    {
        _context = context;
    }

    public void CheckIfProductAlreadyExists(string name)
    {
        if (_context.Products.Any(p => p.Name.ToLower() == name.ToLower()))
            throw new ProductAlreadyExistsException();
    }
}