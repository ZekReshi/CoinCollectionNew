using AutoMapper;
using CoinCollectionBackend.Database.Entities;
using CoinCollectionBackend.Web.Dtos;

namespace CoinCollectionBackend.Web.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile() { 
            CreateMap<Coin, CoinDto>()
                .ReverseMap();
            CreateMap<KeyValuePair<Currency, IEnumerable<Coin>>, CoinGroupByCurrencyDto>()
                .ForMember(dest => dest.Currency, opt => opt.MapFrom(src => src.Key))
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.Value));
            CreateMap<Coin, CoinGroupByCurrencyItemDto>();
            CreateMap<Currency, CurrencyDto>();
            CreateMap<HistoryEntry, HistoryEntryByCoinDto>();
        }
    }
}
