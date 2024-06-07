using AutoMapper;
using ProductApp.Application.DTOs;
using ProductApp.Application.interfaces;
using ProductApp.Domain.Entities;
using ProductApp.Domain.Exceptions;

namespace ProductApp.Application.Services;

public class ProductService
{
    private readonly IProductRepository _productRepository;
    private readonly IMapper _mapper;

    public ProductService(IProductRepository productRepository, IMapper mapper)
    {
        _productRepository = productRepository;
        _mapper = mapper;
    }

    public async Task<List<GetProductRequest>> GetAllAsync()
    {
        var products = await _productRepository.GetAllAsync();
        return _mapper.Map<List<GetProductRequest>>(products);
    }

    public async Task<GetProductRequest> GetByIdAsync(Guid id)
    {
        var product = await _productRepository.GetByIdAsync(id);
        return _mapper.Map<GetProductRequest>(product);
    }

    public async Task<string> AddAsync(PostProductRequest productRequest)
    {
        try
        {
            _productRepository.CheckIfProductAlreadyExists(productRequest.Name);

            var product = _mapper.Map<Product>(productRequest);
            var response = await _productRepository.AddAsync(product);
            return response ? "Success" : "Failed";
        }
        catch (ProductAlreadyExistsException e)
        {
            return e.Message;
        }
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await _productRepository.DeleteAsync(id);
    }

    public async Task<string> UpdateAsync(PutProductRequest productRequest)
    {
        try
        {
            _productRepository.CheckIfProductAlreadyExists(productRequest.Name);

            var product = _mapper.Map<Product>(productRequest);
            var response = await _productRepository.UpdateAsync(product);
            return response ? "Success" : "Failed";
        }
        catch (ProductAlreadyExistsException e)
        {
            return e.Message;
        }
    }
}