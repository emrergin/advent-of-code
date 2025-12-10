using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace _2025.day09
{
    public class Part1
    {
        public static List<long[]> allRedTiles =[];
        public static void Solve()
        {
            string[] lines = Utilities.ReadListOfStrings(9);
            long[][] lines2 = Array.ConvertAll(lines, line => Array.ConvertAll(line.Split(","), long.Parse));

            for (int i = 0; i < lines2.Length; i++)
            {
                allRedTiles.Add([lines2[i][0], lines2[i][1]]);
            }

            long max = long.MinValue;
            for (int i = 0; i < allRedTiles.Count; i++)
            {
                for (int j = i + 1; j < allRedTiles.Count; j++)
                {
                    var tile1 = allRedTiles[i];
                    var tile2 = allRedTiles[j];
                    max = Math.Max(max, Math.Abs(((tile1[0] - tile2[0]))+1) * (Math.Abs((tile1[1] - tile2[1]))+1));
                }
            }
            Console.WriteLine(max);
        }        
    }
}


