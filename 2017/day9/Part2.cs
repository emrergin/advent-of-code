using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace _2017.day9
{
    internal class Part2
    {
        public static void Solve()
        {
            var line = Utilities.ReadLine(9);
            string cleanedString = Regex.Replace(line, @"\!.", "");
            int strIndex = 1;
            int count = 0;
            bool inside = false;

            while (strIndex< cleanedString.Length)
            {
                if (cleanedString[strIndex]=='<' && !inside)
                {
                    inside = true;
                }
                else if(cleanedString[strIndex] == '>' && inside)
                {
                    inside = false;
                }
                else if(inside)
                {
                    count++;
                }
               strIndex++;
            }

            Console.WriteLine(count);

        }
    }
}
