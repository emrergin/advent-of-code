using System.Text.Json;
using System.Text.Json.Serialization;

namespace _2017.day12
{
    public class Part1
    {
        static Dictionary<string, DataStructures.UnionFind> allNodes = [];
        
        public static Dictionary<string, DataStructures.UnionFind>  ParseInput()
        {            
            string[] lines = File.ReadAllLines("./day" + 12 + "/input.txt");

            string[][] lines2 = Array.ConvertAll(lines, line => line.Split(" <-> "));

            foreach (var line in lines2)
            {
                DataStructures.UnionFind newNode = new(line[0]);
                allNodes[line[0]] = newNode;
            }
            foreach (var line in lines2)
            {
                string[] childTags = line[1].Split(", ");
                DataStructures.UnionFind currentParent = allNodes[line[0]];
                foreach (var tag in childTags)
                {
                    DataStructures.UnionFind currentChild = allNodes[tag];
                    DataStructures.UnionFind.Union(currentChild, currentParent);
                }
            }
            return allNodes;
        }
        public static void Solve()
        {
            allNodes = ParseInput();
            Console.WriteLine(allNodes["0"].Find().size);
        }
    }
}
