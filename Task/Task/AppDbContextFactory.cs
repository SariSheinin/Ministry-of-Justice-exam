using Task.Models;
using DAL.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Task
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<DAL.Data.AppDbContext>
    {
        public DAL.Data.AppDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DAL.Data.AppDbContext>();

            var connectionString = "Data Source=.;Initial Catalog=RequestsDB;Integrated Security=True;Trust Server Certificate=True";
            optionsBuilder.UseSqlServer(connectionString);

            try
            {
                return new DAL.Data.AppDbContext(optionsBuilder.Options);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating AppDbContext: {ex.Message}");
                throw;
            }
        }
    }
}