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
        public static Dictionary<int, Layer> CreateStartingLayers()
        {
            var lines = Utilities.ReadArrayOfStrings(13);
            Dictionary<int, Layer> allLayers = [];
            foreach (var line in lines)
            {
                int currentDepth = int.Parse(line[0].Remove(line[0].Length - 1));
                Layer layer = new(int.Parse(line[1]));
                allLayers[currentDepth] = layer;
            }
            return allLayers;
        }
        public static void Solve()
        {
            Dictionary<int, Layer> allLayers = CreateStartingLayers();
            int locationOfPacket = -1;
            int severity = 0;
            int lastLayer = allLayers.Keys.Max();
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
