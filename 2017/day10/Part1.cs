using System.Text.Json;

namespace _2017.day10
{
    internal class Part1
    {
        public static void Solve()
        {
            var line = Utilities.ReadLine(10).Split(",");
            var numbers = Array.ConvertAll(line, int.Parse);
            int currentPosition = 0;
            int skipSize = 0;
            int length = 0;
            int listSize = 256;
            int[] list = Enumerable.Range(0, listSize).ToArray();

            for (int i = 0; i < numbers.Length; i++)
            {
                length = numbers[i];
                int[] oldList = (int[])list.Clone();

                for (int j = 0; j < length / 2; j++)
                {
                    int firstIndex = (currentPosition + j) % (listSize);
                    int secondIndex = (currentPosition - j + length - 1) % (listSize);
                    list[firstIndex] = oldList[secondIndex];
                    list[secondIndex] = oldList[firstIndex];
                }
                oldList = list;
                currentPosition += length + skipSize;
                skipSize++;
            }
            Console.WriteLine(list[0] * list[1]);
        }
    }
}
