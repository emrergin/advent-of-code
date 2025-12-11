using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace _2025.day10
{
    public class Part1
    {
        class IntArrayComparer : IEqualityComparer<int[]>
        {
            public bool Equals(int[]? x, int[]? y)
            {
                if (ReferenceEquals(x, y)) return true;
                if (x is null || y is null) return false;

                return x.SequenceEqual(y);
            }

            public int GetHashCode(int[] obj)
            {
                if (obj is null)
                    throw new ArgumentNullException(nameof(obj));

                unchecked
                {
                    int hash = 17;
                    foreach (var v in obj)
                    {
                        hash = hash * 31 + v.GetHashCode();
                    }
                    return hash;
                }
            }
        }
        private class Problem(int[] indicator, List<int[]> switches, int[] voltageRequirements)
        {
            public int[] indicator = indicator;
            public List<int[]> switches = switches;
            public int[] voltageRequirements = voltageRequirements;

            public override string ToString()
            {
                return string.Join( ",", indicator) +
                    "\n" + string.Join( "|", switches.Select(i=>string.Join(",",i))) + "\n" +
                    string.Join(",", voltageRequirements)+"\n================";
            }

            public List<int> CheckDifference(int[] stateOfIndicator)
            {
                List<int> result = [];
                for (int i = 0; i < indicator.Length; i++)
                {
                    if (stateOfIndicator[i] != indicator[i])
                    {
                        result.Add(i);
                    }
                }
                return result;
            }

            public int[] PressButton(int[] buttons, int index)
            {
                int[] result = [..buttons];
                for(int i = 0; i < buttons.Length; i++)
                {
                    if (switches[index].Contains(i))
                    {
                        result[i] = result[i] == 1 ? 0 : 1;
                    }
                }
                return result;
            }

            public int CountSteps(int[] stateOfIndicator)
            {
                Stack<int[]> solutionStack = [];
                HashSet<string> solutionSet = [];
                var values = new Dictionary<int[], int>(new IntArrayComparer());
                solutionStack.Push(stateOfIndicator);
                solutionSet.Add(string.Join(",",stateOfIndicator));
                while (solutionStack.Count > 0)
                {
                    int[] currentState = solutionStack.Peek();
                    List<int> currentDif = CheckDifference(currentState);
                    if (currentDif.Count==0)
                    {
                        solutionStack.Pop();
                        values[currentState] = 0;
                        continue;
                    }

                    for (int i = 0; i < switches.Count; i++)
                    {
                        int[] currentSwitch = switches[i];
                        if (currentDif.SequenceEqual(currentSwitch))
                        {
                            solutionStack.Pop();
                            values[currentState] = 1;
                            break;
                        }
                    }

                    int minValue = int.MaxValue;
                    for(int i=0;i<switches.Count;i++)
                    {
                        int[] nextState = PressButton(currentState,i);
                        if (!values.TryGetValue(nextState, out int value) && !solutionSet.Contains(string.Join(",",nextState)))
                        {
                            solutionSet.Add(string.Join(",", nextState));
                            solutionStack.Push(nextState);
                            break;
                        }
                        if (values.TryGetValue(nextState, out value)){
                            minValue = Math.Min(minValue, value);
                        }                     

                        if (i == switches.Count - 1)
                        {
                            solutionStack.Pop();
                            values[currentState] = minValue == int.MaxValue ? minValue: minValue +1;
                        }
                    }
                }
                return values[stateOfIndicator];

            }
        }
        public static void Solve()
        {
            string[][] lines = Utilities.ReadArrayOfStrings(10);
            List<Problem> allProblems = [];
            
            for (int i = 0; i < lines.Length; i++)
            {
                int[] currentIndicator = [.. lines[i][0][1..^1].Select(a => a == '.' ? 0 : 1)];
                List<int[]> currentSwitches = [];
                int[] currentRequirements = [];

                for (int j = 1; j < lines[i].Length; j++)
                {
                    if (lines[i][j][0] == '(')
                    {
                        currentSwitches.Add(Array.ConvertAll(lines[i][j][1..^1].Split(','), int.Parse));
                    }
                    else
                    {
                        currentRequirements = Array.ConvertAll(lines[i][j][1..^1].Split(','), int.Parse);
                    }
                }
                allProblems.Add(new Problem(currentIndicator, currentSwitches, currentRequirements));

            }
            
            int total = 0;
            foreach (Problem problem in allProblems)
            {
                int[] currentState = new int[problem.indicator.Length];
                total += problem.CountSteps(currentState);
            }
            Console.WriteLine(total);
        }
    }
}


