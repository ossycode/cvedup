using Microsoft.AspNetCore.Mvc;
using Rotativa.AspNetCore;

namespace webapi.Controllers;


[ApiController]
[Route("[controller]")]
public class CvController : ControllerBase
{
  
  public async Task<IActionResult> CvPDF()
  {
    return new ViewAsPdf();
  }

  [HttpPost("generate-cv")]
  public IActionResult GenerateCV()
  {
    return Ok();
  }
}
