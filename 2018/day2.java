import java.io.IOException;

public class day2 {
    public static void main(String[] args) throws IOException{
        String[] mainInput = Utils.readFile("day2input.txt");
        partOne(mainInput);
        partTwo(mainInput);
    }

    private static void partOne(String[] inputArray){
        Integer twoTimes = 0;
        Integer threeTimes = 0;

        for (int i = 0; i < inputArray.length; i++) {
            Integer increase2 =0;
            Integer increase3 =0;
            for (int j = 1; j < inputArray[i].length(); j++) {
                if(increase2==1 & increase3==1){
                    break;
                }
                Integer counter = 0;
                for (int k = 0; k < inputArray[i].length(); k++) {
                    if(inputArray[i].charAt(j)==inputArray[i].charAt(k)){
                        counter++;
                    }
                }
                if(counter==3){
                    increase3=1;
                }
                if(counter==2){
                    increase2=1;
                }
            }
            twoTimes+=increase2;
            threeTimes+=increase3;
        }
        System.out.println(twoTimes*threeTimes);
    }

    private static void partTwo(String[] inputArray){
        for (int i = 0; i < inputArray.length; i++) {
            for (int j = i+1; j < inputArray.length; j++) {
                Integer counter=0;
                Integer relevantIndex=null;
                for (int k = 0; k < inputArray[i].length(); k++) {
                    if(inputArray[i].charAt(k)!=inputArray[j].charAt(k)){
                        relevantIndex=k;
                        counter++;
                    }
                    if(counter>1){
                        break;
                    }
                }
                if (counter==1 && relevantIndex!=null){
                    System.out.println(inputArray[i].substring(0, relevantIndex) + inputArray[i].substring(relevantIndex + 1));                    
                }
            }
        }
    }
}
