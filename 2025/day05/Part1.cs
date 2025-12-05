using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace _2025.day05
{
    public class Part1
    {
        public static void Solve()
        {
            int total = 0;
            string[] input = Utilities.ReadListOfStrings(5);
            int cutOff = Array.IndexOf(input, "");
            long[] values = Array.ConvertAll(input[(cutOff+1)..], long.Parse);
            long[][] intervals = Array.ConvertAll(input[..cutOff], i => Array.ConvertAll(i.Split('-'), long.Parse));

            for (int i = 0; i < values.Length; i++)
            {
                for(int j = 0; j < intervals.Length; j++)
                {
                    if (values[i] <= intervals[j][1] && values[i] >= intervals[j][0])
                    {
                        total++;
                        goto end;
                    }
                }
            end: { }
            }

            Console.WriteLine(total);
        }
    }
}


