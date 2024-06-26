using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace _2017.day13
{
    internal class Part1
    {
        static readonly Dictionary<int, Layer> allLayers = [];
        internal class Layer(int range)
        {
            public int range = range;
            public int scannerPosition = 0;
            int scannerDirection = 1;

            public void PassTime()
            {
                if (scannerPosition + scannerDirection >= range || scannerPosition + scannerDirection < 0)
                {
                    scannerDirection = -scannerDirection;
                }
                scannerPosition += scannerDirection;
            }
        }
        public static void Solve()
        {
            var lines = Utilities.ReadArrayOfStrings(13);
            int lastLayer = 0;
            foreach (var line in lines)
            {
                int currentDepth = int.Parse(line[0].Remove(line[0].Length - 1));
                Layer layer = new(int.Parse(line[1]));
                allLayers[currentDepth] = layer;
                lastLayer = currentDepth;
            }

            int locationOfPacket = -1;
            int severity = 0;
            while (locationOfPacket < lastLayer + 1)
            {
                locationOfPacket++;
                foreach (var layer in allLayers)
                {
                    if (locationOfPacket == layer.Key && layer.Value.scannerPosition == 0)
                    {
                        severity += layer.Key * layer.Value.range;
                    }
                    layer.Value.PassTime();
                }
            }
            Console.WriteLine(severity);
        }
    }
}
