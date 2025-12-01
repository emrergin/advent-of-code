using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using static System.Runtime.InteropServices.JavaScript.JSType;


namespace _2025.day01
{
    public class Part1
    {
        public static void Solve()
        {
            int dialLocation = 50;
            int numberOfZeroes = 0;
            string[] input = Utilities.ReadListOfStrings(1);
            for(int i = 0; i < input.Length; i++){                
                string[] currentCommand = [input[i][..1],input[i][1..]];
                if (currentCommand[0] == "L")
                {
                    dialLocation -= int.Parse(currentCommand[1]);
                }
                else
                {
                    dialLocation += int.Parse(currentCommand[1]);
                }
                while (dialLocation >= 100)
                {
                    dialLocation -= 100;
                }
                while (dialLocation < 0)
                {
                    dialLocation += 100;
                }
                if (dialLocation == 0)
                {
                    numberOfZeroes++;
                }
            }
            Console.WriteLine("\n");
            Console.WriteLine(numberOfZeroes);
        }
    }
}


