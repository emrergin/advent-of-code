using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace _2017.day18
{
    internal class Part1
    {
        internal class Register()
        {
            public long value = 0;
            public long? lastPlayed = null;

            public void Play()
            {
                lastPlayed = value;
            }
            public void Set(long val)
            {
                value = val;
            }
            public void Add(long val)
            {
                value += val;
            }
            public void Multiply(long val)
            {
                value *= val;
            }
            public void Mod(long val)
            {
                value %= val;
            }

        }
        internal static long GetValue(string str, Dictionary<char,Register> dic)
        {
            long number;
            bool success = long.TryParse(str, out number);
            if (!success)
            {
                number = dic[str[0]].value;
            }
            return number;
        }
        public static void Solve()
        {
            Dictionary<char, Register> allRegisters = [];
            var commands = Utilities.ReadArrayOfStrings(18);
            int index = 0;
            long lastPlayed = -1;
            while (index<commands.Length)
            {
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
                        relatedRegister?.Play();
                        lastPlayed = relatedRegister?.value ?? 0;
                        index++;
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
                        if (relatedRegister!=null && relatedRegister.value != 0)
                        {
                            Console.WriteLine(lastPlayed);
                            goto End;
                        }
                        else
                        {
                            index++;
                        }
                        break;
                    case "jgz":
                        {
                            if (GetValue(command[1], allRegisters) > 0)
                            {
                                index += (int)GetValue(command[2], allRegisters);
                                if ( index < 0)
                                {
                                    goto End;
                                }
                            }
                            else{
                                index++;
                            }
                            break;
                        }

                }
            }
        End:
            {
                Console.WriteLine("End");
            }
        }
    }
}
