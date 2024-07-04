using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace _2017.day15
{
    internal class Part2
    {
        internal static uint Generate(uint prev, int factor, int divider)
        {
            uint nextValue = (uint)(prev * factor % 2147483647);
            if (nextValue % divider == 0)
            {
                return nextValue;
            }
            else
            {
                return Generate(nextValue, factor, divider);
            }
            
        }
        public static void Solve()
        {
            uint[] numbers = Array.ConvertAll(Utilities.ReadArrayOfStrings(15), val => (uint)int.Parse(val[4]));
            int numberOfEquals = 0;
            for (int i = 0; i < 5000000; i++)
            {
                numbers[0] = Generate(numbers[0], 16807,4);
                numbers[1] = Generate(numbers[1], 48271,8);
                if (Part1.GetLast16Bits(numbers[0]) == Part1.GetLast16Bits(numbers[1]))
                {
                    numberOfEquals++;
                }
            }
            Console.WriteLine(numberOfEquals);
        }
    }
}
