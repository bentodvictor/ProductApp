using Microsoft.AspNetCore.Mvc;
using ProductApp.Application.DTOs;
using ProductApp.Application.Services;
using ProductApp.Domain.Entities;

namespace ProductApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductService _productService;

        public ProductsController(ProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetAll()
        {
            var products = await _productService.GetAllAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetById(Guid id)
        {
            var product = await _productService.GetByIdAsync(id);
            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<string>> Add([FromBody] PostProductRequest productRequest)
        {
            var result = await _productService.AddAsync(productRequest);

            return result == "Success"
                ? Ok(result)
                : BadRequest(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<bool>> Update([FromBody] PutProductRequest productRequest)
        {
            var result = await _productService.UpdateAsync(productRequest);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
            var result = await _productService.DeleteAsync(id);
            return result 
                ? Ok(result) 
                : BadRequest(result);

        }
    }
}