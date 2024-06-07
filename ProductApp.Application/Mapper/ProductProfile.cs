using AutoMapper;
using ProductApp.Application.DTOs;
using ProductApp.Domain.Entities;

namespace ProductApp.Application.Mapper;

public class ProductProfile : Profile
{
    public ProductProfile()
    {
        CreateMap<GetProductRequest, Product>().ReverseMap();
        CreateMap<PostProductRequest, Product>().ReverseMap();
        CreateMap<PutProductRequest, Product>().ReverseMap();
    }
}