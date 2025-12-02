using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace _2025.day02
{
    public class Part2
    {
        public static void Solve()
        {
            long total = 0;
            string[] input = Utilities.ReadLine(2).Split(",");
            for (int i = 0; i < input.Length; i++)
            {
                string[] currentInterval = input[i].Split("-");
                for (long j = long.Parse(currentInterval[0]); j <= long.Parse(currentInterval[1]); j++)
                {
                    if (!IsValid(j))
                    {
                        total += j;
                    }
                }
            }

            Console.WriteLine(total);
        }

        private static bool IsValid(long number)
        {
            string text = number.ToString();
            if (text[..(text.Length / 2)] == text[(text.Length / 2)..])
            {
                return false;
            }

            for(int j=1;j<= text.Length / 2; j++)
            {
                int currentIndex = 0;
                string subText = text.Substring(0,j);
                if (text.Length % j != 0)
                {
                    continue;
                }
                while (j + currentIndex <= text.Length)
                {
                    if (subText != text.Substring(currentIndex, j))
                    {
                        goto outer;
                    }
                    currentIndex += j;
                }
                return false;
                outer:;
            }
            return true;
        }
    }
}


