using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static _2025.day08.Part1;


namespace _2025.day08
{
    public class Part2
    {
        public static void Solve()
        {
            if (allNodes.Count == 0)
            {
                ParseNodes();
                ParseEdges();
            }
            long lastX1;
            long lastX2;
            while (true)
            {
                (Point p1, Point p2) = Edges.Dequeue();
                Point.Union(p1, p2);
                lastX1 = p1.x;
                lastX2 = p2.x;
                if (p1.parent?.size == allNodes.Count || p2.parent?.size== allNodes.Count)
                {
                    break;
                }
            }

            Console.WriteLine(lastX1 * lastX2);
        }
       
    }
}


