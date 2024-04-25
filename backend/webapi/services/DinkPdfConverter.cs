using DinkToPdf;
using DinkToPdf.Contracts;

namespace webapi.Services;


public class DinkPdfConverter
{
    private readonly IConverter _converter;
    

    public DinkPdfConverter(IConverter converter)
    {
        _converter = converter;
    }

    public byte[] ConvertHtmlToPdf(string htmlContent)
    {
        var doc = new HtmlToPdfDocument()
        {
            GlobalSettings = {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4
            },
            Objects = {
                new ObjectSettings()
                {
                    HtmlContent = htmlContent
                }
            }
        };

        return _converter.Convert(doc);
    }
}
