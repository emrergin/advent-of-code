using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2017.day17
{
    internal class Part1
    {
        internal static void Solve()
        {
            int stepNumber = Utilities.ReadSingleNumber(17);
            List<int> buffer = [0];
            int nextIndex = -1;
            for (int i = 1; i <= 2017; i++)
            {
                nextIndex = ((nextIndex+stepNumber) % buffer.Count)+1 ;
                buffer.Insert(nextIndex, i);
            }

            Console.WriteLine(buffer[(nextIndex + 1) % buffer.Count]);
        }
    }
}
