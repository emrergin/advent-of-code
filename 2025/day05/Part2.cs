using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace _2025.day05
{
    public class Part2
    {
        public static void Solve()
        {
            long total = 0;
            string[] input = Utilities.ReadListOfStrings(5);
            int cutOff = Array.IndexOf(input, "");
            List <long []> intervals = [.. Array.ConvertAll(input[..cutOff], i => Array.ConvertAll(i.Split('-'), long.Parse))];
            intervals.Sort((a, b) => a[0].CompareTo(b[0]));

            int index = 0;
            while(index<intervals.Count-1) {
                intervals = MergeInterval(intervals,out index, index);
            }

            foreach(var item in intervals)
            {
                total += item[1] - item[0] + 1;
            }
            Console.WriteLine(total);
        }

        private static List<long[]> MergeInterval(List<long[]> list, out int newIndex, int startIndex = 0)
        {
            
            long[] leftInterval = list[startIndex];
            long[] rightInterval = list[startIndex+1];
            newIndex = startIndex;

            if (leftInterval[1] < rightInterval[0])
            {
                newIndex++;
                return list;
            }
            else
            {
                list.RemoveRange(startIndex, 2);
                long left = leftInterval[0];
                long right = Math.Max(rightInterval[1], leftInterval[1]);
                list.Insert(startIndex, [left, right]);
                return list;
            }
        }
    }
}


