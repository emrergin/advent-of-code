using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static _2017.day11.Part1;

namespace _2017.day11
{
    internal class Part2
    {

        public static void Solve()
        {
            var line = Utilities.ReadLine(11).Split(",");
            Location location = new();


            int maxDistance = Int32.MinValue;
            foreach (var direction in line)
            {
                Walk(direction, location);
                int currentDistance = (Math.Abs(location.q) + Math.Abs(location.r) + Math.Abs(location.s)) / 2;
                maxDistance = Math.Max(maxDistance, currentDistance);
            }
            Console.WriteLine(maxDistance);
        }
    }
}
