using System.Text.RegularExpressions;

namespace _2017.day9
{
    internal class Part1
    {
        internal static Group[] allGroups = [];
        internal static Stack<Group> groupStack = [];
        public static void AddChild(Group group)
        {
            var newGroup = new Group(group.score + 1);
            allGroups = [.. allGroups, newGroup];
            groupStack.Push(newGroup);
        }
        internal class Group(int score)
        {
            internal int score = score;
        }
        public static void Solve()
        {
            var line = Utilities.ReadLine(9);
            string cleanedString = Regex.Replace(line, @"\!.", "");
            cleanedString = Regex.Replace(cleanedString, @"\<.*?\>", "");
            var outestGroup = new Group(1);
            allGroups = [outestGroup];
            groupStack.Push(outestGroup);
            int strIndex = 1;

            while (groupStack.Count > 0)
            {
                var currentGroup = groupStack.Peek();

                if (cleanedString[strIndex] == '{')
                {
                    AddChild(currentGroup);
                }
                else if (cleanedString[strIndex] == '}')
                {
                    groupStack.Pop();
                }
                strIndex++;
            }

            Console.WriteLine(allGroups.Select(i => i.score).Sum());

        }
    }
}
