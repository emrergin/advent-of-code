using static _2017.day11.Part1;

namespace _2017.day11
{
    internal class Part1
    {

        internal class Location()
        {
            internal int q = 0;
            internal int s = 0;
            internal int r = 0;
        }
        public static void Walk(string direction, Location location)
        {
            if (direction == "nw")
            {
                location.q--;
                location.s++;
            }
            else if (direction == "n")
            {
                location.r--;
                location.s++;
            }
            else if (direction == "ne")
            {
                location.q++;
                location.r--;
            }
            else if (direction == "sw")
            {
                location.q--;
                location.r++;
            }
            else if (direction == "s")
            {
                location.s--;
                location.r++;
            }
            else if (direction == "se")
            {
                location.q++;
                location.s--;
            }
        }
        public static void Solve()
        {
            var line = Utilities.ReadLine(11).Split(",");
            Location location = new();


            foreach (var direction in line)
            {
                Walk(direction, location);
            }
            int distance = (Math.Abs(location.q) + Math.Abs(location.r) + Math.Abs(location.s)) / 2;
            Console.WriteLine(distance);
        }
    }
}
