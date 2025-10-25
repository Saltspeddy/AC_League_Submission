namespace MyApp.Api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Faculty { get; set; } = string.Empty;
        public int Score { get; set; }
        public string PasswordHash { get; set; } = string.Empty;
    }
}
