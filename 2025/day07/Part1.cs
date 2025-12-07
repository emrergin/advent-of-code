using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace _2025.day07
{
    public class Part1
    {
        static List<Beam> beams = [];
        static List<Beam> newBeams = [];
        static int numberOfSplits = 0;
        static HashSet<string> hs=[];
        public class Beam
        {
            public int x;
            public int y;

            public Beam(int x, int y)
            {
                this.x = x;
                this.y = y;
            }

            public void Move(string[] input)
            {
                if (y < input.Length - 1&& input[y + 1][x]!= '^')
                {
                    y = y + 1;
                    newBeams.Add(this);
                }
                else if(y < input.Length - 1)
                {                    
                    if (!hs.Contains(x + "-" + y))
                    {
                        numberOfSplits++;
                        newBeams.Add(new Beam(x - 1, y + 1));
                        newBeams.Add(new Beam(x + 1, y + 1));
                    }
                    hs.Add(x + "-" + y);

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
                    beams.Add(new Beam(i, 0));
                } 
            }
            int currentY = 0;
            while(currentY< lines.Length-1)
            {
                foreach(Beam beam in beams)
                {
                    beam.Move(lines);
                }
                currentY++;
                beams = newBeams;
                newBeams = [];
            }
            Console.WriteLine(numberOfSplits);           

        }
    }
}


