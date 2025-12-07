using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace _2025.day07
{
    public class Part2
    {
        static Dictionary<string, Beam> beams = [];
        static Dictionary<string, Beam> newBeams = [];

        public class Beam
        {
            public int x;
            public int y;
            public long power;

            public Beam(int x, int y, long power = 1)
            {
                this.x = x;
                this.y = y;
                this.power = power;
            }

            public void SpawnOrMerge(int x, int y)
            {
                if (newBeams.TryGetValue(x + "-" + y, out Beam? existingBeam))
                {
                    existingBeam.power += power;
                }
                else
                {
                    newBeams[x + "-" + y] = new Beam(x, y, power);
                }
            }

            public void Move(string[] input)
            {
                if (input[y + 1][x] != '^')
                {
                    SpawnOrMerge(x, y + 1);
                }
                else
                {
                    SpawnOrMerge(x-1, y + 1);
                    SpawnOrMerge(x+1, y + 1);                   
                }
               }
            }

        public static void Solve()
        {
            string[] lines = Utilities.ReadListOfStrings(7);
            for (int i = 0; i < lines[0].Length; i++)
            {
                if (lines[0][i] == 'S')
                {
                    beams[i + "-0"] = new Beam(i, 0);
                } 
            }
            int currentY = 0;
            while(currentY< lines.Length-1)
            {
                foreach (KeyValuePair<string, Beam> entry in beams)
                {
                    entry.Value.Move(lines);
                }
                currentY++;
                beams = newBeams;
                newBeams = [];
            }

            long total = 0;
            foreach (KeyValuePair<string, Beam> entry in beams)
            {
                total += entry.Value.power;
            }
            Console.WriteLine(total);

        }
    }
}


