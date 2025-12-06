using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Reflection;


namespace _2025.day06
{
    public class Part2
    {
        public static void Solve()
        {
            string[] lines = Utilities.ReadListOfStrings(6);

            for (int i = 0; i < lines.Length - 1; i++)
            {
                for (int j = 0; j < lines[i].Length; j++)
                {
                    if (lines[i][j] != ' ')
                    {
                        for (int k = 0; k < lines.Length - 1; k++)
                        {
                            if (j > lines[k].Length - 1)
                            {
                                while (j > lines[k].Length - 1)
                                {
                                    lines[k] = lines[k] + "@";
                                }
                            }
                            else if (lines[k][j] == ' ')
                            {
                                char[] array = lines[k].ToCharArray();
                                array[j] = '@';
                                lines[k] = new string(array);
                            }
                        }
                    }
                }
            }

            string[][] lines2 = Array.ConvertAll(lines, line => line.Split(" ",StringSplitOptions.RemoveEmptyEntries));

            long total = 0;
            for (int i = lines2[0].Length - 1; i >= 0; i--)
            {
                string currentOperation = lines2[^1][i];
                long result = currentOperation == "*" ? 1 : 0;
                List<long> currentNumbers = [];

                int kMax = 20;
                for(int k=0; k< kMax; k++)
                {
                    string currentNumber = "";
                    for (int j = 0; j < lines2.Length-1; j++)
                    {
                        kMax = lines2[0][i].Length;
                        if (lines2[j][i][k] != '@')
                        {
                            currentNumber += lines2[j][i][k];
                        }
                    }
                    currentNumbers.Add(long.Parse(currentNumber));
                }
                foreach(var number in currentNumbers)
                {
                    if (currentOperation == "*")
                    {
                        result *= number;
                    }
                    else
                    {
                        result += number;
                    }
                }
                total += result;
            }

            Console.WriteLine(total);
        }
    }
}

