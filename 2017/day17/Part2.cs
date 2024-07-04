using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace _2017.day17
{
    internal class Part2
    {
        internal static LinkedListNode<int> GetNextMember(LinkedListNode<int> node, int toSkip)
        {
            int skippedSoFar = 0;
            LinkedListNode<int> current = node;
            while (skippedSoFar < toSkip)
            {
                current = current.Next ?? current.List!.First!;
                skippedSoFar++;
            }
            return current;
        }
        public static void Solve()
        {
            int stepNumber = Utilities.ReadSingleNumber(17);
            int[] init = { 0 };
            LinkedList<int> buffer = new LinkedList<int>(init);
            LinkedListNode<int> current = buffer.First!;
            LinkedListNode<int> zeroNode = buffer.First!;
            for (int i = 1; i <= 50000000; i++)
            {
                current = GetNextMember(current, stepNumber);
                buffer.AddAfter(current, i);
                current = current.Next!;
            }

            Console.WriteLine(zeroNode.Next!.Value);
        }
    }
}
