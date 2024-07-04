using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2017.day16
{
    internal class Part2
    {
        public static void Solve()
        {
            string[] commands = Utilities.ReadArrayOfStrings(16)[0][0].Split(",");
            char[] letters = "abcdefghijklmnop".ToCharArray();

            for (int i = 0; i < 1000000000; i++)
            {
                foreach (string command in commands)
                {
                    letters = Part1.OnePass(letters, command);
                }
                if (i % 1000 == 0)
                {
                    Console.WriteLine(i);
                }
            }
            Console.WriteLine(String.Join("", letters));
        }
    }
}
