
namespace Symptopro.APIS.Errors
{
    public class ApiResponse
    {
        public int StatusCode { get; set; }
        public string? Message { get; set; }
        public ApiResponse(int statusCode, string? message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(StatusCode);
        }

        private string? GetDefaultMessageForStatusCode(int? statusCode)
        {
            return StatusCode switch
            {
                500 => "Internal Server Error",
                400 => "Bad Request",
                401 => "UnAuthorized",
                404 => "Resource Not Fount",
                _ => null
            };
        }
    }
}
