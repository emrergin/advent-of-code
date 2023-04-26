import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

public class Utils {
    public static String[] readFile(String fileName) throws IOException {
        Path path = Paths.get(fileName);
        byte[] bytes = Files.readAllBytes(path);
        @SuppressWarnings("unused")
		List<String> allLines = Files.readAllLines(path, StandardCharsets.UTF_8);
        return new String(bytes).split("\n");
    }
}
