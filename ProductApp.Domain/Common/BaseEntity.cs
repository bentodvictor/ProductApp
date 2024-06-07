namespace ProductApp.Domain.Common;

public class BaseEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime InclusionDate { get; set; } = DateTime.Now;
}