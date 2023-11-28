package YouTubeAPI;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.List;

import static org.junit.Assert.*;

public class HomePageTest {

    private WebDriver driver;

    @Before
    public void setUp() throws InterruptedException {
        driver = new ChromeDriver();
        driver.get("C:\\Users\\loh27\\Documents\\Year3\\Software Quality Assurance\\UNM-SQA-2023-24\\index.html");
        driver.manage().window().maximize();
        Thread.sleep(5000);
    }

    @Test
    public void testHomePageFunctionality() throws InterruptedException {
        // Find all video elements
        List<WebElement> videoElements = driver.findElements(By.cssSelector("#videos .video-container"));
        // Verify that there are exactly 12 video elements
        assertEquals(12, videoElements.size());

        // Check each video element for related titles
        for (WebElement videoElement : videoElements) {
            // Find the title element within each video element
            WebElement titleElement = videoElement.findElement(By.cssSelector(".video-title"));

            // Get the text of the title element
            String videoTitle = titleElement.getText();

            // Check if the title contains the expected keywords
            assertTrue(isRelatedToSoftwareQualityAssurance(videoTitle));
        }
    }

    @After
    public void tearDown() {
        // Close the WebDriver after the test
        if (driver != null) {
            driver.quit();
        }
    }

    // Function to check if the video title is related to SOFTWARE QUALITY ASSURANCE
    private boolean isRelatedToSoftwareQualityAssurance(String title) {
        return title.toLowerCase().contains("software") ||
                title.toLowerCase().contains("quality") ||
                title.toLowerCase().contains("assurance") ||
                title.toLowerCase().contains("sqa");
    }
}