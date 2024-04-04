using AutoMapper;
using server.Models;

namespace server
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<TodoItem, TodoItemDto>();
            CreateMap<TodoItemDto, TodoItem>();
        }
    }
}