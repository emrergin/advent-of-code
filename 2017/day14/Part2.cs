using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2017.day14
{
    internal class Part2
    {
        static Dictionary<string, DataStructures.UnionFind> allNodes = [];
        public static void Solve()
        {
            var word = Utilities.ReadLine(14);
            string[] hashInputs = new string[128];
            int[][] map = new int[128][];
            for (int i = 0; i < hashInputs.Length; i++)
            {
                hashInputs[i] = word + "-" + i;
                string nonBinaryHash = day10.Part2.KnotHash(hashInputs[i].ToCharArray());
                int[] currentLine = Part1.ConvertToBinary(nonBinaryHash);
                map[i] = currentLine;
            }

            for (int i = 0; i < map.Length; i++)
            {
                for (int j = 0; j < map[i].Length; j++)
                {
                    if (map[i][j] != 0)
                    {
                        DataStructures.UnionFind newNode = new(i + "|" + j);
                        allNodes[i + "|" + j] = newNode;
                    }
                }
            }

            for (int i = 0; i < map.Length; i++)
            {
                for (int j = 0; j < map[i].Length; j++)
                {
                    if (map[i][j] != 0)
                    {
                        for (int k = -1; k < 2; k++)
                        {
                            for (int l = -1; l < 2; l++)
                            {
                                DataStructures.UnionFind currentParent = allNodes[i + "|" + j];
                                if (Math.Abs(k+l)==1)
                                {
                                    string key = (i + k) + "|" + (j + l);
                                    if (allNodes.TryGetValue(key, out DataStructures.UnionFind? value) && value != null)
                                    {
                                        DataStructures.UnionFind.Union(value, currentParent);
                                    }
                                }
                            }
                        }

                    }
                }
            }


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
