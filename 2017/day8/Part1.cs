using System.Text.Json;

namespace _2017.day8
{
    internal class Part1
    {
        internal static void UseInstructions(int part)
        {
            string[][] input = _2017.Utilities.ReadArrayOfStrings(8);
            Dictionary<string, int> registers = [];
            int max = Int32.MinValue;
            foreach (var inputItem in input)
            {
                registers[inputItem[0]] = 0;
            }
            foreach (var inputItem in input)
            {
                bool a = false;
                int regVal = registers[inputItem[4]];
                string comparator = inputItem[5];
                int valueToCompare = int.Parse(inputItem[6]);
                switch (comparator)
                {
                    case "==":
                        a = regVal == valueToCompare;
                        break;
                    case ">=":
                        a = regVal >= valueToCompare;
                        break;
                    case "<=":
                        a = regVal <= valueToCompare;
                        break;
                    case "!=":
                        a = regVal != valueToCompare;
                        break;
                    case ">":
                        a = regVal > valueToCompare;
                        break;
                    case "<":
                        a = regVal < valueToCompare;
                        break;
                    default:
                        break;
                }
                if (a)
                {
                    int valueToChange = int.Parse(inputItem[2]);
                    if (inputItem[1] == "dec")
                    {
                        registers[inputItem[0]] -= valueToChange;
                    }
                    else
                    {
                        registers[inputItem[0]] += valueToChange;
                    }
                    max = Math.Max(registers[inputItem[0]], max);
                }
            }

            if (part == 1)
            {
                Console.WriteLine("part "+part+": "+registers.Values.Max());
            }
            else
            {
                Console.WriteLine("part " + part + ": " + max);
            }
        }

        public static void Solve()
        {
            UseInstructions(1);

        }
    }
}
