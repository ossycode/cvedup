using DinkToPdf;
using DinkToPdf.Contracts;
using webapi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<HandlebarHelper>();
builder.Services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));


var app = builder.Build();



// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
