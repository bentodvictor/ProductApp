using ProductApp.Domain.Common;

namespace ProductApp.Domain.Entities;

public class Product : BaseEntity
{
    public string Name { get; set; }
    public decimal Value { get; set; }

    public Product(string name, decimal value)
    {
        Name = name;
        Value = value;
    }
}
