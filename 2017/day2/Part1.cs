using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;


namespace _2017.day2
{
    public class Part1

    {

        public static void Solve()
        {
            int[][] input = _2017.Utilities.ReadArrayOfNumbers(2);
            int total = 0;

            foreach (var item in input)
            {
                int max = Int32.MinValue;
                int min = Int32.MaxValue;
                foreach (var item2 in item)
                {
                    max = Math.Max(item2, max);
                    min = Math.Min(item2, min);
                }
            total+=max-min;
            }
            Console.WriteLine(total);
        }
    }


}


