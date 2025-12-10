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
    public class Part2
    {
        private static readonly List<int[]> allRedTiles = [];
        private static readonly List<int[]> middlePoints = [];

        public static void Solve()
        {
            string[] lines = Utilities.ReadListOfStrings(9);
            int[][] lines2 = Array.ConvertAll(lines, line => Array.ConvertAll(line.Split(","), int.Parse));

            for (int i = 0; i < lines2.Length; i++)
            {
                int nextIndex = i == lines2.Length - 1 ? 0 : (i + 1);
                allRedTiles.Add([lines2[i][0], lines2[i][1]]);
                middlePoints.Add([lines2[i][0], lines2[i][1]]);
                middlePoints.Add([
                    (int)Math.Round((lines2[i][0] + lines2[nextIndex][0]) / 2.0), 
                    (int)Math.Round((lines2[i][1] + lines2[nextIndex][1]) / 2.0)
                ]);
            }
            long max = long.MinValue;
            for (int i = 0; i < allRedTiles.Count; i++)
            {
                for (int j = i + 1; j < allRedTiles.Count; j++)
                {
                    int[] tile1 = allRedTiles[i];
                    int[] tile2 = allRedTiles[j];
                    if (!IfMiddlePointCaptured(tile1, tile2))
                    {
                        long area = (Math.Abs(tile1[0] - tile2[0]) + 1) * (Math.Abs(tile1[1] - tile2[1]) + 1);
                        max = Math.Max(max, area);
                    }
                }
            }
            Console.WriteLine(max);
        }
       
        public static bool IfMiddlePointCaptured(int[] redTile1, int[] redTile2)
        {
            foreach (var candidate in middlePoints)
            {
                bool isXBetween = redTile1[0] > candidate[0] && redTile2[0] < candidate[0] || redTile2[0] > candidate[0] && redTile1[0] < candidate[0];
                bool isYBetween = redTile1[1] > candidate[1] && redTile2[1] < candidate[1] || redTile2[1] > candidate[1] && redTile1[1] < candidate[1];
                if (isXBetween&&isYBetween)
                {
                    return true;
                }
            }
            return false;
        }
    }
}


