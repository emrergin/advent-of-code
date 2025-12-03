using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace _2017.day20
{
    internal class Part2
    {
        public static void Solve()
        {
            string[] lines = File.ReadAllLines("./day20/input.txt");
            List<int[]> allNumbers = [];
            
            for (int i=0; i<lines.Length; i++)
            {
                var matches = Regex.Matches(lines[i], @"-?\d+");
                int[] currentNumbers = matches
                    .Select(m => int.Parse(m.Value)).ToArray();
                allNumbers.Add(currentNumbers);                
            }

            int k = 0;
            while (k <= 100000)
            {
                if (k % 100 == 0)
                {
                    Console.WriteLine(k);
                }
                HashSet<(int, int, int)> hs = [];
                HashSet<(int, int, int)> duble = [];
                HashSet<int> toRemove = [];
                for (int i = 0; i < allNumbers.Count; i++)
                {
                    allNumbers[i] = Step(allNumbers[i]);                    
                    if (hs.Contains((allNumbers[i][0], allNumbers[i][1], allNumbers[i][2])))
                    {
                        duble.Add((allNumbers[i][0], allNumbers[i][1], allNumbers[i][2]));
                    }
                    hs.Add((allNumbers[i][0], allNumbers[i][1], allNumbers[i][2]));
                }
                for (int i = 0; i < allNumbers.Count; i++)
                {
                    if(duble.Contains((allNumbers[i][0], allNumbers[i][1], allNumbers[i][2])))
                    {
                        toRemove.Add(i);
                    }
                }
                allNumbers = allNumbers
                    .Where((value, index) => !toRemove.Contains(index))
                    .ToList();
                k++;
            }
            Console.WriteLine(allNumbers.Count);

        }
        private static int[] Step(int[] particle)
        {
            int[] result = particle;
            result[3] = result[3] + particle[6];
            result[4] = result[4] + particle[7];
            result[5] = result[5] + particle[8];
            result[0] = result[0] + particle[3];
            result[1] = result[1] + particle[4];
            result[2] = result[2] + particle[5];
            return particle;
        }
    }
}
