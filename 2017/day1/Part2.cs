using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2017.day1
{
    public class Part2
    {
        public static void Solve()
        {
            string input = _2017.Utilities.ReadLine();
            int length = input.Length;
            int step = length / 2;
            int total = 0;
            for (int i = 0; i < length; i++)
            {
                if ((i + step < length && input[i] == input[i + step]) || (i + step >= length && input[i] == input[i + step - length]))
                {
                    total += (int)Char.GetNumericValue(input[i]);
                }
            }
            Console.WriteLine(total);

        }
    }
}
