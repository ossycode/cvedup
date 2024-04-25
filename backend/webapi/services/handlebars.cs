using HandlebarsDotNet;

namespace webapi.Services;

public class HandlebarHelper
{
    private readonly IWebHostEnvironment _webHostEnvironment;

    public HandlebarHelper(IWebHostEnvironment webHostEnvironment)
    {
        _webHostEnvironment = webHostEnvironment;
    }
    public string RenderTemplate(string templateName, object data)
    {
        var templatePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Templates", templateName + ".hbs");
        var templateContent = File.ReadAllText(templatePath);
        var compiledTemplate = Handlebars.Compile(templateContent);
        var renderedHtml = compiledTemplate(data);
        return renderedHtml;
    }
}