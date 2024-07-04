using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2017.day16
{
    internal class Part2
    {
        internal static Cycle CatchCycle(string[] array)
        {
            int len = array.Length;

            for (int k = 0; k < len / 3; k++)
            {
                if ((len - k) % 2 != 0)
                {
                    continue;
                }
                for (int i = k; i < (len + k) / 2; i++)
                {
                    int j = (len - k) / 2 + i;
                    if (array[i] != array[j])
                    {
                        goto Outer;
                    }
                }
                return new Cycle((len - k) / 2, k);

            Outer:
                {
                }
            }
            return new Cycle(0, null);

        }
        internal class Cycle(int length, int? start)
        {
            public readonly int length = length;
            public readonly int? start = start;
        }
        public static void Solve()
        {
            string[] commands = Utilities.ReadArrayOfStrings(16)[0][0].Split(",");
            char[] letters = "abcdefghijklmnop".ToCharArray();
            string[] standingsSoFar = [];
            int i;
            Cycle? existingCycle = null;


            for (i = 0; i < 1000000000; i++)
            {
                foreach (string command in commands)
                {
                    letters = Part1.OnePass(letters, command);
                }
                standingsSoFar = [.. standingsSoFar, String.Join("", letters)];
                existingCycle = CatchCycle(standingsSoFar);
                if (existingCycle.start != null)
                {
                    goto End;
                }
            }
        End:
            {
                if (existingCycle != null && existingCycle.start != null)
                {
                    Console.WriteLine(standingsSoFar[(1000000000 %  existingCycle.length) + (int)existingCycle.start-1]);
                }
            }
        }
    }
}
