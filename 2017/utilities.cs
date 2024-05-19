using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2017
{
    public static class Utilities
    {
        public static string ReadLine()
        {
            string? line = null;
            try
            {
                //Pass the file path and file name to the StreamReader constructor
                StreamReader sr = new("./day1/input.txt");
                line = sr.ReadLine();

                //close the file
                sr.Close();

            }
            catch (Exception e)
            {
                Console.WriteLine("Exception: " + e.Message);
            }
            if (line != null)
            {
                return line;
            }
            else
            {
                throw new Exception("Some mistake with the input file.");
            }

        }
    }
}
