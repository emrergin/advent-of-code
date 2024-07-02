using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static _2017.DataStructures;

namespace _2017
{


    public static class DataStructures
    {

        public class UnionFind(string tag)
        {
            public int size = 1;
            public UnionFind? parent = null;
            readonly string tag = tag;

            internal UnionFind Find()
            {
                UnionFind? currentNode = this;
                while (currentNode.parent != null)
                {
                    currentNode = currentNode.parent;
                }
                return currentNode;
            }

            public static void Union(UnionFind set1, UnionFind set2)
            {
                UnionFind finalParent1 = set1.Find();
                UnionFind finalParent2 = set2.Find();
                if (finalParent1.tag == finalParent2.tag) { return; }
                else
                {
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
    }

}
