using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;


namespace _2017.day1
{
    public class Part1
    {
        public static void Solve()
        {
            string input = _2017.Utilities.ReadLine(1);
            int length = input.Length;
            int total = 0;
            for (int i = 0; i < length; i++)
            {
                if ((i < length - 1 && input[i] == input[i + 1]) || (i == length - 1 && input[i] == input[0]))
                {

                    total += (int)Char.GetNumericValue(input[i]);
                }
            }
            Console.WriteLine(total);
        }
    }
}


