namespace CoinCollectionBackend.Web.Dtos
{
    public class CoinGroupByCurrencyDto
    {
        public CurrencyDto Currency { get; set; }
        public IEnumerable<CoinGroupByCurrencyItemDto> Items { get; set; }
    }
}
