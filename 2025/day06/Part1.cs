using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace _2025.day06
{
    public class Part1
    {
        public static void Solve()
        {
            string[] lines = Utilities.ReadListOfStrings(6);
            string[][] input = Array.ConvertAll(lines, line => line.Split(" ", StringSplitOptions.RemoveEmptyEntries));
            long total = 0;

            for (int i = input[0].Length-1; i >= 0; i--)
            {
                string currentOperation = input[^1][i];
                long result = currentOperation == "*" ? 1 : 0;
                for (int j = 0; j < input.Length - 1; j++)
                {
                    if (currentOperation == "*")
                    {
                        result *= int.Parse(input[j][i]);
                    }
                    else
                    {
                        result += int.Parse(input[j][i]);
                    }
                }
                total+= result;
            }

            Console.WriteLine(total);
        }
    }
}


