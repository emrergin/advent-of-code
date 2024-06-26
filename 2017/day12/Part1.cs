using System.Text.Json;
using System.Text.Json.Serialization;

namespace _2017.day12
{
    public class Part1
    {
        static Dictionary<string, UnionFind> allNodes = [];
        public class UnionFind(string tag)
        {
            public int size = 1;
            public UnionFind? parent = null;
            readonly string tag = tag;

            internal string Find()
            {
                UnionFind? currentNode = this;
                while (currentNode.parent != null)
                {
                    currentNode = currentNode.parent;
                }
                return currentNode.tag;
            }

            public static void Union(UnionFind set1, UnionFind set2)
            {
                string parent1 = set1.Find();
                string parent2 = set2.Find();
                if (parent1 == parent2) { return; }
                else
                {
                    UnionFind finalParent1 = allNodes[parent1];
                    UnionFind finalParent2 = allNodes[parent2];
                    if (finalParent1.size > finalParent2.size)
                    {
                        finalParent2.parent = finalParent1;
                        finalParent1.size += finalParent2.size;
                    }
                    else
                    {
                        finalParent1.parent = finalParent2;
                        finalParent2.size += finalParent1.size;
                    }
                }
            }
        }
        public static Dictionary<string, UnionFind>  ParseInput()
        {            
            string[] lines = File.ReadAllLines("./day" + 12 + "/input.txt");

            string[][] lines2 = Array.ConvertAll(lines, line => line.Split(" <-> "));

            foreach (var line in lines2)
            {
                UnionFind newNode = new(line[0]);
                allNodes[line[0]] = newNode;
            }
            foreach (var line in lines2)
            {
                string[] childTags = line[1].Split(", ");
                UnionFind currentParent = allNodes[line[0]];
                foreach (var tag in childTags)
                {
                    UnionFind currentChild = allNodes[tag];
                    UnionFind.Union(currentChild, currentParent);
                }
            }
            return allNodes;
        }
        public static void Solve()
        {
            allNodes = ParseInput();
            Console.WriteLine(allNodes[allNodes["0"].Find()].size);
        }
    }
}
