using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace _2017.day19
{
    internal class Part1and2
    {
        public readonly static Dictionary<string, (int x, int y)> directions = new()
        {
            { "down",  (0, 1) },
            { "left",  ( -1, 0) },
            { "up",    ( 0, -1) },
            { "right", ( 1, 0 ) }
        };
        public static void Solve()
        {
            int currentY = 0;
            string currentDir = "down";
            string[] lines = File.ReadAllLines("./day19/input.txt");
            int currentX = lines[0].IndexOf('|');
            char currentChar = '|';
            int numberOfSteps = 0;
            while (currentChar!=' ')
            {
                if (currentChar == '+')
                {
                    if (currentDir == "down" || currentDir == "up")
                    {
                        if (lines[currentY + directions["left"].y][currentX + directions["left"].x]!=' ')
                        {
                            currentDir = "left";
                        }
                        else
                        {
                            currentDir = "right";
                        }
                    }
                    else
                    {
                        if (lines[currentY + directions["up"].y][currentX + directions["up"].x] != ' ')
                        {
                            currentDir = "up";
                        }
                        else
                        {
                            currentDir = "down";
                        }
                    }
                }
                if (char.IsLetter(currentChar))
                {
                    Console.Write(currentChar);
                }
                currentY += directions[currentDir].y;
                currentX += directions[currentDir].x;
                currentChar = lines[currentY][currentX];
                numberOfSteps++;
            }
            Console.WriteLine("\n"+numberOfSteps);

        }
    }
}
