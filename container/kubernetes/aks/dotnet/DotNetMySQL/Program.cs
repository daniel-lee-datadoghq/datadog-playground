using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.OpenApi;
using Serilog.Formatting.Compact;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();

var logger = new LoggerConfiguration()
    .WriteTo.Console(new RenderedCompactJsonFormatter())
    .CreateLogger();

var app = builder.Build();

app.UseHttpsRedirection();

string connectionString = app.Configuration.GetConnectionString("AZURE_MYSQL_CONNECTIONSTRING")!;
logger.Information("connectionString: {@connectionString}", connectionString);

try
{
    // Table would be created ahead of time in production
    logger.Information("Creating Persons database table ...");
    using var conn = new MySqlConnection(connectionString);
    conn.Open();
    var command = new MySqlCommand(
        "CREATE TABLE Persons (ID int NOT NULL PRIMARY KEY, FirstName varchar(255), LastName varchar(255));",
        conn);
    using MySqlDataReader reader = command.ExecuteReader();
    logger.Information("Persons database table created!");
}
catch (Exception e)
{
    // Table may already exist
    logger.Information(e.Message);
}

app.MapGet("/Person", () => {
    var rows = new List<string>();

    using var conn = new MySqlConnection(connectionString);
    conn.Open();

    var command = new MySqlCommand("SELECT * FROM Persons", conn);
    using MySqlDataReader reader = command.ExecuteReader();

    if (reader.HasRows)
    {
        while (reader.Read())
        {
            rows.Add($"{reader.GetInt32(0)}, {reader.GetString(1)}, {reader.GetString(2)}");
        }
    }

    logger.Information("GET /Person: {rows}", rows);
    return rows;
})
.WithName("GetPersons")
.WithOpenApi();

app.MapPost("/Person", (Person person) => {
    
    var rows = new List<string>();
    int next_id = 1;
    
    // Retrieve maxID from the database
    using (var conn = new MySqlConnection(connectionString))
    {
        conn.Open();
    
        var max_id_command = new MySqlCommand("SELECT MAX(Id) FROM Persons", conn);

        var maxID = max_id_command.ExecuteScalar();

        if (maxID.ToString() != "")
        {
            next_id = Convert.ToInt32(maxID) + 1;
        }
    }
    
    // Insert new person using maxID
    using (var conn = new MySqlConnection(connectionString)) 
    {
        conn.Open();
        
        var insert_command = new MySqlCommand(
            "INSERT INTO Persons (ID, firstName, lastName) VALUES (@Id, @firstName, @lastName)",
            conn);

        insert_command.Parameters.Clear();
        insert_command.Parameters.AddWithValue("@Id", next_id);
        insert_command.Parameters.AddWithValue("@firstName", person.FirstName);
        insert_command.Parameters.AddWithValue("@lastName", person.LastName);

        using MySqlDataReader insert_reader = insert_command.ExecuteReader();
    }

    logger.Information("POST /Person: {@firstName} {@lastName}", person.FirstName, person.LastName);
})
.WithName("CreatePerson")
.WithOpenApi();

app.Run();