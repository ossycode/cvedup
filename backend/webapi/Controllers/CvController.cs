using DinkToPdf;
using Microsoft.AspNetCore.Mvc;
using Rotativa.AspNetCore;
using webapi.Services;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class CvController : ControllerBase
{
   private readonly HandlebarHelper _handlebarsHelper;

    public CvController(HandlebarHelper handlebarsHelper)
    {
        _handlebarsHelper = handlebarsHelper;
    }

  [HttpGet("generate-cv")]
  public IActionResult GenerateCV()
  {
      var data = new
            {
                name = "John Doe",
                email = "john@example.com",
                phone = "123-456-7890",
                address = new
                {
                    street = "123 Main St",
                    city = "Anytown",
                    state = "CA",
                    zip = "12345",
                },
                summary = "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
                education = new[]
                {
                    new
                    {
                        degree = "Bachelor of Science",
                        field = "Computer Science",
                        school = "University of Somewhere",
                        year = "2022",
                    }
                },
                work = new[]
                {
                    new
                    {
                        position = "Software Developer",
                        company = "Tech Innovations Inc.",
                        startYear = "2022",
                        endYear = "Present",
                        responsibilities = new[]
                        {
                            "Developing and maintaining web applications",
                            "Collaborating with the design team to implement new features",
                            "Writing clean, efficient, and documented code",
                        },
                    }
                },
                skills = new[] { "JavaScript", "React", "Node.js", "HTML/CSS" },
            };

      var htmlContent =   _handlebarsHelper.RenderTemplate("Template1", data);

      var converter = new BasicConverter(new PdfTools());

      var doc = new HtmlToPdfDocument()
            {
                GlobalSettings = {
                    ColorMode = ColorMode.Color,
                    Orientation = Orientation.Portrait,
                    PaperSize = PaperKind.A4,
                    // Out = 
                },
                Objects = {
                    new ObjectSettings()
                    {
                        HtmlContent = htmlContent,
                        PagesCount = true,
                        WebSettings = {DefaultEncoding = "ulf-8"}
                    }
                }
            };
        // var pdf = _pdfConverter.ConvertHtmlToPdf(htmlContent);

        // return Ok();
        byte[] pdfBytes = converter.Convert(doc);

          return File(pdfBytes, "application/pdf", "output.pdf");
  }

  // [HttpGet]
  // public IActionResult GeneratePDF()
  //  {
  //    var data = new
  //       {
  //           name = "John Doe",
  //           email = "john@example.com",
  //           phone = "123-456-7890",
  //           address = new
  //           {
  //               street = "123 Main St",
  //               city = "Anytown",
  //               state = "CA",
  //               zip = "12345",
  //           },
  //           summary = "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  //           education = new[]
  //           {
  //               new
  //               {
  //                   degree = "Bachelor of Science",
  //                   field = "Computer Science",
  //                   school = "University of Somewhere",
  //                   year = "2022",
  //               }
  //           },
  //           work = new[]
  //           {
  //               new
  //               {
  //                   position = "Software Developer",
  //                   company = "Tech Innovations Inc.",
  //                   startYear = "2022",
  //                   endYear = "Present",
  //                   responsibilities = new[]
  //                   {
  //                       "Developing and maintaining web applications",
  //                       "Collaborating with the design team to implement new features",
  //                       "Writing clean, efficient, and documented code",
  //                   },
  //               }
  //           },
  //           skills = new[] { "JavaScript", "React", "Node.js", "HTML/CSS" },
  //       };

  //  var htmlContent =   _handlebarsHelper.RenderTemplate("Template1", data);

  //  var converter = new Rotativa.AspNetCore.
  //  {
  //   PageSize = Rotativa.AspNetCore.Options.Size.A4,
    
  //  };

  // }
}
