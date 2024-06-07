namespace ProductApp.Domain.Exceptions;

public class ProductAlreadyExistsException : Exception
{
    public ProductAlreadyExistsException() : base("Product already exists.")
    {
    }
}