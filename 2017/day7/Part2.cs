using System.Text.Json.Serialization;

namespace _2017.day7
{
    internal class Part2
    {
        internal static Dictionary<string, Program2> programs = [];
        public class Program2(string name, string[] programsAbove, string? parent, int w) : Part1.Program(name, programsAbove, parent)
        {
            internal int individualWeight = w;
            internal int allWeightSupported = w;

            internal void Carry()
            {
                if (programsAbove.Length == 0)
                {
                    return;
                }
                else
                {
                    foreach (var program in programsAbove)
                    {
                        programs[program].Carry();
                        allWeightSupported += programs[program].allWeightSupported;
                    }
                }
            }
            internal void Check()
            {
                if (programsAbove.Length == 0)
                {
                    return;
                }
                else
                {
                    int[] weightsAbove = [];
                    int[] individualWeightsAbove = [];
                    foreach (var program in programsAbove)
                    {
                        programs[program].Check();
                        weightsAbove = [.. weightsAbove, programs[program].allWeightSupported];
                        individualWeightsAbove = [.. individualWeightsAbove, programs[program].individualWeight];
                    }


                    int? firstNonDuplicate = weightsAbove.GroupBy(i => i).Where(g => g.Count() == 1).Select(g => g.Key).FirstOrDefault();
                    int nonDuplicateIndex = Array.IndexOf(weightsAbove, firstNonDuplicate);

                    if (nonDuplicateIndex == -1)
                    {
                        return;
                    }

                    int otherIndex = 0;
                    if (nonDuplicateIndex == 0)
                    {
                        otherIndex = 1;
                    }
                    Console.WriteLine(weightsAbove[otherIndex] - weightsAbove[nonDuplicateIndex] + individualWeightsAbove[nonDuplicateIndex]);

                }
            }
        }
        public static void Solve()
        {
            string[][] input = _2017.Utilities.ReadArrayOfStrings(7);
            foreach (var inputItem in input)
            {
                string name = inputItem[0];
                string[] programsAbove = inputItem.Skip(3).Select(s => s.TrimEnd(',')).ToArray();
                int weight = Int32.Parse(inputItem[1].Substring(1, inputItem[1].Length - 2));
                Program2 program = new(name, programsAbove, null, weight);
                programs[name] = program;
            }

            foreach (var inputItem in input)
            {
                string[] programsAbove = inputItem.Skip(3).Select(s => s.TrimEnd(',')).ToArray();
                foreach (var program in programsAbove)
                {
                    programs[program].parent = inputItem[0];
                }
            }
            foreach (KeyValuePair<string, Program2> entry in programs)
            {
                if (entry.Value.parent == null)
                {
                    programs[entry.Value.name].Carry();
                    programs[entry.Value.name].Check();
                    break;
                }
            }
        }


    }
}
