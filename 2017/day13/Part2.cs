using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace _2017.day13
{
    internal class Part2
    {
        internal class Layer2(int range, int depth)
        {
            public int range = range;
            public int scannerPosition = depth % (range * 2 - 2);

            public void PassTime(int time)
            {
                scannerPosition = (depth + time) % (this.range * 2 - 2);
            }
        }

        public static Dictionary<int, Layer2> CreateStartingLayers()
        {
            var lines = Utilities.ReadArrayOfStrings(13);
            Dictionary<int, Layer2> allLayers = [];
            foreach (var line in lines)
            {
                int currentDepth = int.Parse(line[0].Remove(line[0].Length - 1));
                Layer2 layer = new(int.Parse(line[1]), currentDepth);
                allLayers[currentDepth] = layer;
            }
            return allLayers;
        }
        public static void Solve()
        {

            Dictionary<int, Layer2> allLayers = CreateStartingLayers();
            int timePassed = 0;
            while (true)
            {
                bool correct = true;
                foreach (var layer in allLayers)
                {
                    layer.Value.PassTime(timePassed);
                    if (layer.Value.scannerPosition == 0)
                    {
                        correct = false;
                        goto End;
                    }
                }
            End:
                {
                    if (correct)
                    {
                        break;
                    }
                    else
                    {
                        timePassed++;
                    }
                }
            }
            Console.WriteLine(timePassed);
        }
    }
}
