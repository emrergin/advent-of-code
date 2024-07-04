using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace _2017.day16
{
    internal class Part1
    {
        internal static char[] Spin(char[] letters, int x)
        {
            int length = letters.Length;
            return letters[(length - x)..length].Concat(letters[0..(length - x)]).ToArray();
        }
        internal static char[] Exchange(char[] letters, int pos1, int pos2) {
            char[] newArray = (char[])letters.Clone();
            newArray[pos1] = letters[pos2];
            newArray[pos2] = letters[pos1];
            return newArray;
        }
        internal static char[] Partner(char[] letters, char ch1, char ch2)
        {
            char[] newArray = (char[])letters.Clone();
            int pos1 = Array.IndexOf(letters,ch1);
            int pos2 = Array.IndexOf(letters, ch2);
            newArray[pos1] = letters[pos2];
            newArray[pos2] = letters[pos1];
            return newArray;
        }
        internal static char[] OnePass(char[] letters, string command)
        {
            string restOfCommand = command[1..];

            if (command[0] == 's')
            {
                letters = Spin(letters, int.Parse(restOfCommand));
            }
            else if (command[0] == 'x')
            {
                string[] dividedCommand = restOfCommand.Split('/');
                letters = Exchange(letters, int.Parse(dividedCommand[0]), int.Parse(dividedCommand[1]));
            }
            else if (command[0] == 'p')
            {
                letters = Partner(letters, command[1], command[3]);
            }

            return letters;
        }
        public static void Solve()
        {
            string[] commands = Utilities.ReadArrayOfStrings(16)[0][0].Split(",");
            char[] letters = "abcdefghijklmnop".ToCharArray();
            foreach(string command in commands)
            {
                letters = OnePass(letters, command);
            }
            Console.WriteLine(String.Join("",letters));
        }
    }
}
