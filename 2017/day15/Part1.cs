using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace _2017.day15
{
    internal class Part1
    {
        internal static uint Generate(uint prev, int factor)
        {
            Int64 newValue = prev * factor;
            return (uint)(newValue % 2147483647);
        }
        internal static string GetLast16Bits(uint value)
        {
            return Convert.ToString(value, 2).PadLeft(16, '0')[^16..];
        }
        public static void Solve()
        {
            uint[] numbers = Array.ConvertAll(Utilities.ReadListOfNumbers(15), val => (uint)val);
            int numberOfEquals = 0;
            for (int i = 0; i < 40000000; i++)
            {
                numbers[0] = Generate(numbers[0], 16807);
                numbers[1] = Generate(numbers[1], 48271);
                if (GetLast16Bits(numbers[0]) == GetLast16Bits(numbers[1]))
                {
                    numberOfEquals++;
                }
            }

            Console.WriteLine(numberOfEquals);
        }
    }
}
