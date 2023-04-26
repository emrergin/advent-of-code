import java.io.IOException;

public class day3 {
    public static void main(String[] args) throws IOException{
        String[] mainInput = Utils.readFile("day3input.txt");
        partOne(mainInput);
        partTwo(mainInput);
    }

    private static void partOne(String[] inputArray){
        int[][] fabric = new int[1000][1000];
        for (int i = 0; i < inputArray.length; i++) {
            
            int xStart = Integer.parseInt(inputArray[i].split(" ")[2].split(",")[0]);
            int yStart = Integer.parseInt(inputArray[i].split(" ")[2].split(",")[1].replaceAll(".$", ""));
            int width = Integer.parseInt(inputArray[i].split(" ")[3].split("x")[0]);
            int height = Integer.parseInt(inputArray[i].split(" ")[3].split("x")[1]);

            for (int j = xStart; j < xStart+width; j++) {
                for (int k = yStart; k < yStart+height; k++) {
                    fabric[j][k]=fabric[j][k]+1;
                }
            }
        }

        int counter=0;

        for (int j = 0; j < 1000; j++) {
            for (int k = 0; k < 1000; k++) {
                if(fabric[j][k]>1){
                    counter++;
                }
            }
        }
        System.out.println(counter);
    }

    private static void partTwo(String[] inputArray){
        int[][] fabric = new int[1000][1000];
        for (int i = 0; i < inputArray.length; i++) {
            
            int xStart = Integer.parseInt(inputArray[i].split(" ")[2].split(",")[0]);
            int yStart = Integer.parseInt(inputArray[i].split(" ")[2].split(",")[1].replaceAll(".$", ""));
            int width = Integer.parseInt(inputArray[i].split(" ")[3].split("x")[0]);
            int height = Integer.parseInt(inputArray[i].split(" ")[3].split("x")[1]);

            for (int j = xStart; j < xStart+width; j++) {
                for (int k = yStart; k < yStart+height; k++) {
                    fabric[j][k]=fabric[j][k]+1;
                }
            }
        }
        outerloop: for (int i = 0; i < inputArray.length; i++) {
            
            int xStart = Integer.parseInt(inputArray[i].split(" ")[2].split(",")[0]);
            int yStart = Integer.parseInt(inputArray[i].split(" ")[2].split(",")[1].replaceAll(".$", ""));
            int width = Integer.parseInt(inputArray[i].split(" ")[3].split("x")[0]);
            int height = Integer.parseInt(inputArray[i].split(" ")[3].split("x")[1]);

            for (int j = xStart; j < xStart+width; j++) {
                for (int k = yStart; k < yStart+height; k++) {
                    if(fabric[j][k]>1){
                        continue outerloop;
                    }
                }
            }
            System.out.println(inputArray[i]);
        }
    }
}
