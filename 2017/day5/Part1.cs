using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2017.day5
{
    internal class Part1
    {

        public static void Solve()
        {
            int[] input = _2017.Utilities.ReadListOfNumbers(5);

            int currentIndex = 0;
            int numberOfSteps = 0;
            while(currentIndex > -1 && currentIndex < input.Length)
            {
                int tempIndex = currentIndex;
                currentIndex += input[tempIndex];
                input[tempIndex] += 1;
                numberOfSteps++;
            }
            Console.WriteLine(numberOfSteps);
        }
    }
}
