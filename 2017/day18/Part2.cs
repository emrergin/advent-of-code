using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static _2017.day18.Part1;

namespace _2017.day18
{
    internal class Part2
    {
        static int numberOfSentBy1 = 0;
        static string[][] commands = [];
        static int deadlockCounter = 0;
        internal class Computer(int id)
        {
            internal int id = id;
            int index = 0;
            public long[] transmissions = [];
            readonly Dictionary<char, Register> allRegisters = [];
            public bool active = true;
            public Computer? other = null;

            public void Setup(Computer comp)
            {
                other = comp;
                Register pRegister = new()
                {
                    value = id
                };
                allRegisters['p'] = pRegister;
            }

            public void RunOnce()
            {
                if (!active) { return; }
                if (index > commands.Length)
                {
                    active = false;
                    return;
                }
                string[] command = commands[index];
                char registerTag = command[1][0];

                if (allRegisters.TryGetValue(registerTag, out Register? relatedRegister))
                {
                }
                else if (!Char.IsDigit(registerTag))
                {
                    relatedRegister = new Register();
                    allRegisters[registerTag] = relatedRegister;
                }

                switch (command[0])
                {
                    case "snd":
                        transmissions = [.. transmissions, GetValue(command[1], allRegisters)];
                        index++;
                        if (id == 1)
                        {
                            numberOfSentBy1++;
                        }
                        break;
                    case "set":
                        relatedRegister?.Set(GetValue(command[2], allRegisters));
                        index++;
                        break;
                    case "add":
                        relatedRegister?.Add(GetValue(command[2], allRegisters));
                        index++;
                        break;
                    case "mul":
                        relatedRegister?.Multiply(GetValue(command[2], allRegisters));
                        index++;
                        break;
                    case "mod":
                        relatedRegister?.Mod(GetValue(command[2], allRegisters));
                        index++;
                        break;
                    case "rcv":
                        if (other != null && other.transmissions.Length > 0 && relatedRegister!=null)
                        {
                            relatedRegister.value = other.transmissions[0];
                            index++;
                            other.transmissions = other.transmissions.Skip(1).ToArray();
                        }
                        else
                        {
                            deadlockCounter++;
                        }
                        break;
                    case "jgz":
                        {
                            if (GetValue(command[1], allRegisters) > 0)
                            {
                                index += (int)GetValue(command[2], allRegisters);
                                if (index < 0 || index >= commands.Length)
                                {
                                    active = false;
                                }
                            }
                            else
                            {
                                index++;
                            }
                            break;
                        }

                }
            }
        }
        public static void Solve()
        {
            commands = Utilities.ReadArrayOfStrings(18);

            Computer firstComputer = new(0);
            Computer secondComputer = new(1);
            firstComputer.Setup(secondComputer);
            secondComputer.Setup(firstComputer);

            while (firstComputer.active && secondComputer.active && deadlockCounter < 2)
            {
                deadlockCounter = 0;
                firstComputer.RunOnce();
                secondComputer.RunOnce();
            }

            Console.WriteLine(numberOfSentBy1);
            Console.WriteLine("End");
        }


    }
}
