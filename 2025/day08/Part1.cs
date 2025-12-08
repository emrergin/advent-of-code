using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace _2025.day08
{
    public class Part1
    {
        public static readonly Dictionary<string, Point> allNodes = [];
        public static readonly PriorityQueue<(Point p1, Point p2), double> Edges = new();
        public static void Solve()
        {
            ParseNodes();
            ParseEdges();

            int k = 0;
            while (k < 1000)
            {
                (Point p1, Point p2) = Edges.Dequeue();
                Point.Union(p1, p2);
                k++;
            }
            int[] values = [.. allNodes.Values.Where(a=>a.parent==null).Select(a => a.size)];
            Array.Sort(values);

            Console.WriteLine(values[values.Length-1] * values[values.Length - 2] * values[values.Length - 3]);

        }
        public static void ParseNodes()
        {
            string[] lines = Utilities.ReadListOfStrings(8);
            long[][] lines2 = Array.ConvertAll(lines, line => Array.ConvertAll(line.Split(","), long.Parse));


            for (int i = 0; i < lines2.Length; i++)
            {
                string tag = lines2[i][0] + "|" + lines2[i][1] + "|" + lines2[i][2];
                allNodes[tag] = new Point(tag, lines2[i][0], lines2[i][1], lines2[i][2]);
            }
        }

        public static void ParseEdges()
        {
            var points = allNodes.Values.ToList();
            for (int i = 0; i<points.Count; i++)
            {
                for (int j = i + 1; j<points.Count; j++)
                {
                    Point point1 = points[i];
                    Point point2 = points[j];
                    double distance = Euclidean(point1, point2);
                    if (point1.tag != point2.tag)
                    {
                        Edges.Enqueue((point1, point2), distance);
                    }
                }
            }
        }


        private static double Euclidean(Point P1,Point P2)
        {
            return Math.Sqrt((P1.x - P2.x)* (P1.x - P2.x) + (P1.y - P2.y) * (P1.y - P2.y) + (P1.z - P2.z) * (P1.z - P2.z));
        }

        public class Point: DataStructures.UnionFind
        {
            public long x;
            public long y;
            public long z;
            public Point(string tag, long x, long y, long z)
        : base(tag)
            {
                this.x = x;
                this.y = y;
                this.z = z;
            }
           
        }
    }
}


