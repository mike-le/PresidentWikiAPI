using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Microsoft.EntityFrameworkCore;
using PresidentWiki.DataAccess;

namespace PresidentWiki
{
    public class Startup
    {
        public const string AppS3BucketKey = "AppS3Bucket";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public static IConfiguration Configuration { get; set; }
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddDbContext<RDSContext>(
               options => options.UseSqlServer(Helper.GetRDSConnectionString())
            );
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            services.AddAWSService<Amazon.S3.IAmazonS3>();
        }
        
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors(options =>
                options.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod()
            );

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
