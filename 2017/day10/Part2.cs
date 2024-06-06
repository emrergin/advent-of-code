using System.Drawing;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace _2017.day10
{
    internal class Part2
    {
        internal static string Densify(int[] sparseHash)
        {
            int[] denseHash = new int[16];
            string[] denseHashHex = new string[16];
            for (int i = 0; i < denseHash.Length; i++)
            {
                denseHash[i] = 0;
                for (int j = 0; j < 16; j++)
                {
                    denseHash[i] = denseHash[i]^ sparseHash[i*16+j];
                }
                denseHashHex[i] = denseHash[i].ToString("X2");
            }

            return String.Join("", denseHashHex).ToLower();
        }
        public static void Solve()
        {
            char[] line = Utilities.ReadLine(10).ToCharArray();
            int[] numbers = Array.ConvertAll(line, n => (int)n).Concat([17, 31, 73, 47, 23]).ToArray();
            int currentPosition = 0;
            int skipSize = 0;
            int length = 0;
            int listSize = 256;
            int[] list = Enumerable.Range(0, listSize).ToArray();

            for (int k = 0; k < 64; k++)
            {
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
            }
            Console.WriteLine(Densify(list));
           
        }
    }
}
