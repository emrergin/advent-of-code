using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace _2017.day14
{
    internal class Part1
    {
        internal static int[] ConvertToBinary(string hexstring)
        {
            string temp = String.Join(String.Empty,
                hexstring.Select(
                    c => Convert.ToString(Convert.ToInt32(c.ToString(), 16), 2).PadLeft(4, '0')
                )
            );

           char[] characters = temp.ToCharArray();
            return Array.ConvertAll(characters, c => c - '0');
        }
        public static void Solve()
        {
            var word = Utilities.ReadLine(14);
            string[] hashInputs = new string[128];
            int sum = 0;
            for (int i = 0; i < hashInputs.Length; i++)
            {
                hashInputs[i] = word + "-" + i;
                string nonBinaryHash = day10.Part2.KnotHash(hashInputs[i].ToCharArray());
                int[] currentLine = ConvertToBinary(nonBinaryHash);
                sum += currentLine.Sum();
            }
            Console.WriteLine(sum);
        }
    }
}
