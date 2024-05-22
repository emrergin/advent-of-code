using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace _2017.day6
{
    internal class Part2
    {

        public static void Solve()
        {
            int[] input = _2017.Utilities.ReadArrayOfNumbers(6)[0];
            HashSet<string> valuesSoFar = [JsonSerializer.Serialize(input)];
            Dictionary<string,int> steps = new();
            int step = 0;
            steps.Add(JsonSerializer.Serialize(input), step);

            while (true)
            {
                step++;
                Part1.Allocate(input);
                if (valuesSoFar.Contains(JsonSerializer.Serialize(input)))
                {
                    Console.WriteLine(step-steps[JsonSerializer.Serialize(input)]);
                    break;
                }
                else
                {
                    valuesSoFar.Add(JsonSerializer.Serialize(input));
                    steps.Add(JsonSerializer.Serialize(input), step);
                }
            }
        }
    }
}
