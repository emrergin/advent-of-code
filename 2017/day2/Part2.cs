namespace _2017.day2
{
    internal class Part2
    {



        public static void Solve()
        {
            int[][] input = _2017.Utilities.ReadArrayOfNumbers(2);
            int total = 0;

            foreach (var item in input)
            {
                for (int i = 0; i < item.Length; i++)
                {
                    for (int j = i + 1; j < item.Length; j++)
                    {
                        if (item[i] % item[j] == 0)
                        {
                            total += item[i] / item[j];
                            goto outerloop;
                        }
                        else if (item[j] % item[i] == 0)
                        {
                            total += item[j] / item[i];
                            goto outerloop;
                        }
                    }
                outerloop: continue;
                }
            }
            Console.WriteLine(total);
        }
    }


}

