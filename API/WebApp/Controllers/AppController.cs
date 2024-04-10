using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("API/[controller]")]
    public class AppController : ControllerBase
    {
        [HttpGet]
        [Route("Teste")]
        public JsonResult Teste()
        {
            return new JsonResult("Teste");
        }
    }
}