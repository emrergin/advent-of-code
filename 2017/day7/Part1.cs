using System.Drawing;
using System.Text.Json;
using System.Xml.Linq;

namespace _2017.day7
{
    internal class Part1
    {

        internal static Dictionary<string, Program> programs = [];
        public class Program(string name, string[] programsAbove, string? parent, int weight = 0)
        {
            internal string name  = name;
            internal string[] programsAbove = programsAbove;
            internal int weight  = weight;
            internal string? parent  = parent;
        }

        public static void Solve()
        {
            string[][] input = _2017.Utilities.ReadArrayOfStrings(7);
            foreach (var inputItem in input)
            {
                string name = inputItem[0];
                string[] programsAbove = inputItem.Skip(3).ToArray();
                Program program = new(name, programsAbove, null);
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
            foreach (KeyValuePair<string, Program> entry in programs)
            {
                if (entry.Value.parent == null)
                {
                    Console.WriteLine(entry.Value.name);
                    break;
                }
            }
        }
    }
}
