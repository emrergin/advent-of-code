using System.Text.Json;

namespace _2017.day6
{
    internal class Part1
    {
        public static void Solve()
        {
            int[] input = _2017.Utilities.ReadArrayOfNumbers(6)[0];
            HashSet<string> valuesSoFar = [JsonSerializer.Serialize(input)];
            int step = 0;

            while (true)
            {
                step++;
                Allocate(input);
                if (valuesSoFar.Contains(JsonSerializer.Serialize(input)))
                {                   
                    Console.WriteLine(step);
                    break;
                }
                else
                {                    
                    valuesSoFar.Add(JsonSerializer.Serialize(input));
                }
            }
        }

        public static void Allocate(int[] array)
        {
            int max = Int32.MinValue;
            int maxIndex = -1;
            for (int i = 0; i < array.Length; i++)
            {
                if (array[i] > max)
                {
                    max = array[i];
                    maxIndex = i;
                }
            }

            int blocksToDistribute = array[maxIndex];
            array[maxIndex] = 0;
            int currentIndex = (maxIndex + 1) % array.Length;

            while (blocksToDistribute > 0)
            {
                array[currentIndex] += 1;
                currentIndex = (currentIndex + 1) % array.Length;
                blocksToDistribute--;
            }
        }
    }
}
