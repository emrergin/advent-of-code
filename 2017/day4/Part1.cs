namespace _2017.day4
{
    internal class Part1
    {
        public static void Solve()
        {
            string[][] arrayOfPasswords = _2017.Utilities.ReadArrayOfStrings(4);
            int numberOfValid = 0;

            for (int i = 0; i < arrayOfPasswords.Length; i++)
            {

                if (CheckForPart1(arrayOfPasswords[i]))
                {
                    numberOfValid++;
                }
            }
            Console.WriteLine(numberOfValid);
        }

        internal static bool CheckForPart1(string[] array)
        {
            bool valid = true;
            for (int j = 0; j < array.Length; j++)
            {
                for (int k = j + 1; k < array.Length; k++)
                {
                    if (array[k] == array[j])
                    {
                        valid = false;
                        return valid;
                    }
                }
            }
            return valid;
        }
    }
}
