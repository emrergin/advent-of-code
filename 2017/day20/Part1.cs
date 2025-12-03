using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace _2017.day20
{
    internal class Part1
    {
        public static void Solve()
        {
            string[] lines = File.ReadAllLines("./day20/input.txt");
            List<int[]> allNumbers = [];
            double minAcceleration = double.PositiveInfinity;
            int indexForMax = -1;
            for(int i=0; i<lines.Length; i++)
            {
                var matches = Regex.Matches(lines[i], @"-?\d+");
                int[] currentNumbers = matches
                    .Select(m => int.Parse(m.Value)).ToArray();
                allNumbers.Add(currentNumbers);
                double currentAcceleration = Math.Sqrt(currentNumbers[6]* currentNumbers[6] + currentNumbers[7]* currentNumbers[7] + currentNumbers[8]* currentNumbers[8]);
                if(currentAcceleration < minAcceleration)
                {
                    minAcceleration = currentAcceleration;
                    indexForMax = i;
                }
            }
            Console.WriteLine(indexForMax);

        }
    }
}
