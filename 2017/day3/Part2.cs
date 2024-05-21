using System.Drawing;

namespace _2017.day3
{
    public class Part2

    {
        internal static Dictionary<Point, Cell> cells = [];
        internal static bool loopBroken = false;
        internal static int limit = 0;
        internal class Cell(int x, int y, int value)
        {
            internal int x = x;
            internal int y = y;
            internal int value = value;

        }

        internal static void AddCell(int xVal, int yVal)
        {
            int value = Math.Max(1, GetSumOfNeighbours(xVal, yVal));
            Cell cell = new(xVal, yVal, value);
            cells[new Point(xVal, yVal)] = cell;
            if (value > limit)
            {
                loopBroken = true;
                Console.WriteLine(value);
            }
        }

        internal static int GetSumOfNeighbours(int x, int y)
        {
            return GetCellValueOrZero(x - 1, y - 1) + GetCellValueOrZero(x, y - 1) + GetCellValueOrZero(x + 1, y - 1) + GetCellValueOrZero(x - 1, y) + GetCellValueOrZero(x + 1, y) + GetCellValueOrZero(x - 1, y + 1) + GetCellValueOrZero(x, y + 1) + GetCellValueOrZero(x + 1, y + 1);
        }

        internal static int GetCellValueOrZero(int x, int y)
        {
            if (cells.TryGetValue(new Point(x, y), out var cell))
            {
                return cell?.value ?? 0;
            }
            return 0;
        }

        internal static Point GoTop(Point point)
        {
            int currentX = point.X;
            int currentY = point.Y;

            if (loopBroken)
            {
                return new Point(currentX, currentY);
            }

            do
            {
                currentY--;
                AddCell(currentX, currentY);
            } while (cells.ContainsKey(new Point(currentX - 1, currentY))&&!loopBroken);

            return new Point(currentX, currentY);
        }

        internal static Point GoLeft(Point point)
        {
            int currentX = point.X;
            int currentY = point.Y;

            if (loopBroken)
            {
                return new Point(currentX, currentY);
            }

            do
            {
                currentX--;
                AddCell(currentX, currentY);
            } while (cells.ContainsKey(new Point(currentX, currentY+1)) && !loopBroken);

            return new Point(currentX, currentY);
        }

        internal static Point GoBottom(Point point)
        {
            int currentX = point.X;
            int currentY = point.Y;

            if (loopBroken)
            {
                return new Point(currentX, currentY);
            }

            do
            {
                currentY++;
                AddCell(currentX, currentY);
            } while (cells.ContainsKey(new Point(currentX + 1, currentY)) && !loopBroken);

            return new Point(currentX, currentY);
        }

        internal static Point GoRight(Point point)
        {
            int currentX = point.X;
            int currentY = point.Y;

            if (loopBroken)
            {
                return new Point(currentX, currentY);
            }

            do
            {
                currentX++;
                AddCell(currentX, currentY);
            } while (cells.ContainsKey(new Point(currentX, currentY-1)) && !loopBroken);

            return new Point(currentX, currentY);
        }


        internal static Point GoDirection(Point point, string direction)
        {
            int currentX = point.X;
            int currentY = point.Y;

            int xStepToMove = direction=="right"? 1: direction=="left"? -1: 0;
            int yStepToMove = direction == "down" ? 1 : direction == "up" ? -1 : 0;
            int xStepToCheck = direction == "up" ? 1 : direction == "down" ? -1 : 0;
            int yStepToCheck = direction == "left" ? 1 : direction == "right" ? -1 : 0;

            if (loopBroken)
            {
                return new Point(currentX, currentY);
            }

            do
            {
                currentX += xStepToMove;
                currentY += yStepToMove;
                AddCell(currentX, currentY);
            } while (cells.ContainsKey(new Point(currentX+ xStepToCheck, currentY + yStepToCheck)) && !loopBroken);

            return new Point(currentX, currentY);
        }



        public static void Solve()
        {
            limit = _2017.Utilities.ReadSingleNumber(3);
            AddCell(0, 0);
            AddCell(1, 0);
            Point afterMovement = new Point(1, 0);
            while (!loopBroken)
            {
                afterMovement = GoTop(afterMovement);
                afterMovement = GoLeft(afterMovement);
                afterMovement = GoBottom(afterMovement);
                afterMovement = GoRight(afterMovement);
            }


            foreach (var res in cells)
            {
                Console.WriteLine("key {0}: x = {1}, y = {2}, value = {3}", res.Key, res.Value.x, res.Value.y, res.Value.value);
            }
        }
    }
}
