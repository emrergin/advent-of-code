namespace _2017.day3
{
    public class Part1
    {
        public static void Solve()
        {
            int input = _2017.Utilities.ReadSingleNumber(3);
            int spiralSmallSide = 1;
            int total = 1;
            int nth = 0;


            while (total < input)
            {
                total += (spiralSmallSide + 1) * 4;
                spiralSmallSide += 2;
                nth++;
            }
            int difference = input - total  + (spiralSmallSide-1) * 4;
            int center = (spiralSmallSide - 1) / 2;
            int remaining = (difference - center) % (spiralSmallSide - 1);

            Console.WriteLine(remaining + nth);
        }

    }
}
