using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace _2025.day02
{
    public class Part1
    {
        public static void Solve()
        {
            long total = 0;
            string[] input = Utilities.ReadLine(2).Split(",");
            for(int i = 0; i < input.Length; i++)
            {
                string[] currentInterval = input[i].Split("-");
                for (long j = long.Parse(currentInterval[0]); j <= long.Parse(currentInterval[1]); j++)
                {
                    if (!IsValid(j))
                    {
                        total+=j;
                    }
                }
            }
           
            Console.WriteLine(total);
        }

        private static bool IsValid(long number)
        {
            string text = number.ToString();
            if(text.Length%2 != 0) { return true; }
            if (text[..(text.Length / 2)] == text[(text.Length / 2)..])
            {
                return false;
            }
            return true;
        }
    }
}


