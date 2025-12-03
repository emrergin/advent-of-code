using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Runtime.InteropServices;


namespace _2025.day03
{
    public class Part2
    {
        public static void Solve()
        {
            long total = 0;
            string[] input = Utilities.ReadListOfStrings(3);
            
            for(int i= 0; i < input.Length; i++)
            {
                int next = 0;
                List<char> relevantDigits = [];
                for(int j=11; j>=0; j--)
                {
                    char digit = GetRelevantDigit(input[i], next, j, out next);
                    relevantDigits.Add(digit);
                }
                long greatestPossible = long.Parse(new string(relevantDigits.ToArray()));
                total += greatestPossible;
            }
            Console.WriteLine( total );

        }

        public static char GetRelevantDigit(string line, int startingDigit, int fromLastDigit, out int nextDigit)
        {
            int maxSoFar = -1;
            nextDigit = 0;
            for (int i = startingDigit; i < line.Length - fromLastDigit; i++)
            {
                int c = (int)char.GetNumericValue(line[i]);
                if (c > maxSoFar)
                {
                    maxSoFar = c;
                    nextDigit = i + 1;
                }
            }
            return (char)(maxSoFar + '0');
        }

    }
}


