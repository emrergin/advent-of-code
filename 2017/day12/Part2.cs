using System.Text.Json;
using System.Text.Json.Serialization;

namespace _2017.day12
{
    internal class Part2
    {
        static Dictionary<string, Part1.UnionFind> allNodes = [];

       
        public static void Solve()
        {
            allNodes = Part1.ParseInput();

            int numberOfGroups = 0;
            foreach (var node in allNodes)
            {
                if (node.Value.parent == null)
                {
                    numberOfGroups++;
                }
            }
            Console.WriteLine(numberOfGroups);

        }
    }
}
