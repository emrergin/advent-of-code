using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace _2025.day04
{
    public class Part2
    {
        public static void Solve()
        {
            int total = 0;
            string[] input = Utilities.ReadListOfStrings(4);
 
            Dictionary<(int x, int y), char> Tiles = [];
            (int x, int y)[] directions = [(0, 1), (-1, 1), (-1, 0), (-1,-1), (0, -1), (1, -1), (1, 0), (1, 1)];
            for(int i=0; i<input.Length; i++)
            {
                for(int j=0; j < input[i].Length; j++)
                {
                    Tiles[(i,j)] = input[i][j];
                }
            }
            bool continueRemoving = true;
            while (continueRemoving)
            {
                continueRemoving = false;
                for (int i = 0; i < input.Length; i++)
                {
                    for (int j = 0; j < input[i].Length; j++)
                    {
                        int filled = 0;
                        if (Tiles[(i, j)] != '@')
                        {
                            continue;
                        }
                        for (int k = 0; k < directions.Length; k++)
                        {
                            char value;
                            if (Tiles.TryGetValue((i + directions[k].x, j + directions[k].y), out value))
                            {
                                if (value == '@')
                                {
                                    filled++;
                                }
                            }
                        }
                        if (filled < 4)
                        {
                            total++;
                            Tiles[(i, j)] = '.';
                            continueRemoving = true;
                        }
                    }
                }
            }
            Console.WriteLine(total);
        }
    }
}


