package examples.users;

import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import com.intuit.karate.junit5.Karate;
import net.masterthought.cucumber.Configuration;
import net.masterthought.cucumber.ReportBuilder;
import org.apache.commons.io.FileUtils;
import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

//DO NOT USE @ RUN WITH(Karate.class)
//@RunWith(Karate.class)
//@KarateOptions(features = "classpath:src/test/java/examples/users/APITask.feature")
public class KarateRunner {
    @Karate.Test
    public void testParallel() {
        //System.setProperty("karate.env", "demo"); // ensure reset if other tests (e.g. mock) had set env in CI
        // Specify your feature here
        Results results = Runner.path("classpath:src/test/java/examples/users/*.feature").tags("~@APITest").parallel(5);
        generateReport(results.getReportDir());
        assertEquals(results.getFailCount() == 0, results.getErrorMessages());
        }

    // Generate report method to generate the report
    public static void generateReport(String karateOutputPath) {
        Collection<File> jsonFiles = FileUtils.listFiles(new File(karateOutputPath), new String[] {"json"}, true);
        List<String> jsonPaths = new ArrayList(jsonFiles.size());
        jsonFiles.forEach(file -> jsonPaths.add(file.getAbsolutePath()));
        //Specify the folder where to want to generate the feature file
        Configuration config = new Configuration(new File("target"), "KarateEPAMTraining");
        ReportBuilder reportBuilder = new ReportBuilder(jsonPaths, config);
        reportBuilder.generateReports();
    }
}