using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2025
{
    public static class Utilities
    {
        public static string ReadLine(int day)
        {
            string? line = null;
            try
            {
                //Pass the file path and file name to the StreamReader constructor
                StreamReader sr = new("./day"+day+"/input.txt");
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

        public static int[][] ReadArrayOfNumbers(int day)
        {
            string[][] lines2 = ReadArrayOfStrings(day);
            int[][] lines3 = Array.ConvertAll(lines2, line => Array.ConvertAll(line,int.Parse));
            return lines3;
        }

        public static int[] ReadListOfNumbers(int day)
        {
            string[] lines = File.ReadAllLines("./day" + day + "/input.txt");
            int[] lines2 = Array.ConvertAll(lines, int.Parse);
            return lines2;
        }

        public static string[] ReadListOfStrings(int day)
        {
            string dayPadded = day.ToString("00");
            string[] lines = File.ReadAllLines("./day" + dayPadded + "/input.txt");
            return lines;
        }

        public static string[][] ReadArrayOfStrings(int day)
        {
            string[] lines = File.ReadAllLines("./day" + day + "/input.txt");
            string[][] lines2 = Array.ConvertAll(lines, line => line.Split());
            return lines2;
        }


        public static int ReadSingleNumber(int day)
        {
            return ReadListOfNumbers(day)[0];
        }
    }
}
