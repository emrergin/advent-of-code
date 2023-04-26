import java.util.HashSet;
import java.io.IOException;

public class day1 {
    public static void main(String[] args) throws IOException{
        String[] mainInput = Utils.readFile("day1input.txt");
        partOne(mainInput);
        partTwo(mainInput);
    }

    private static void partOne(String[] inputArray){
        Integer result = 0;
        for (int i = 0; i < inputArray.length; i++) {
            result = result + Integer.parseInt(inputArray[i]);
        }
        System.out.println(result);
    }

    private static void partTwo(String[] inputArray){
        Integer result = 0;
        HashSet<Integer> set = new HashSet<Integer> ();
        set.add(result); 
        Integer counter=0;
        while(true){
            result += Integer.parseInt(inputArray[counter%inputArray.length]);
            if(!set.contains(result)){
                set.add(result);
            }
            else{
                System.out.println(result);
                break;
            }
            counter++;
        }
    }
}
