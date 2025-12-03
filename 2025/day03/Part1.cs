using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace _2025.day03
{
    public class Part1
    {
        public static void Solve()
        {
            long total = 0;
            string[] input = Utilities.ReadListOfStrings(3);
            for(int i= 0; i < input.Length; i++)
            {
                char firstDigit = Part2.GetRelevantDigit(input[i], 0, 1, out int next);
                char secondDigit = Part2.GetRelevantDigit(input[i], next, 0, out _);
                int greatestPossible = int.Parse($"{firstDigit}{secondDigit}");
                total += greatestPossible;
            }
            Console.WriteLine( total );

        }
    }
}


