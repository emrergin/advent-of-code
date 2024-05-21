using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace _2017.day4
{
    internal class Part2
    {
        public static void Solve()
        {
            string[][] arrayOfPasswords = _2017.Utilities.ReadArrayOfStrings(4);
            int numberOfValid = 0;

            for (int i = 0; i < arrayOfPasswords.Length; i++)
            {
                if (CheckForPart2(arrayOfPasswords[i]))
                {
                    numberOfValid++;
                }
            }
            Console.WriteLine(numberOfValid);
        }

        internal static bool CheckForPart2(string[] array)
        {
            bool valid = true;
            for (int j = 0; j < array.Length; j++)
            {
                for (int k = j + 1; k < array.Length; k++)
                {
                    if (OrderedString(array[k]) == OrderedString(array[j]))
                    {
                        valid = false;
                        return valid;
                    }
                }
            }
            return valid;
        }

        internal static string OrderedString(string pass)
        {
            char[] characters = pass.ToCharArray();
            Array.Sort(characters);
            return string.Join("", characters);
        }
    }
}
