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
public class VideoTitleTest {
    private WebDriver driver;

    @Before
    public void setUp() throws InterruptedException {
        driver = new ChromeDriver();
        driver.get("C:\\Users\\loh27\\Documents\\Year3\\Software Quality Assurance\\UNM-SQA-2023-24\\index.html");
        driver.manage().window().maximize();
        Thread.sleep(5000);
    }

    @Test
    public void testVideoTitle() throws InterruptedException {
        // Find all video elements
        List<WebElement> videoElements = driver.findElements(By.cssSelector("#videos .video-container"));
        // Verify that there are exactly 12 video elements
        assertEquals(12, videoElements.size());

        // Check each video element for thumbnail and title
        for (WebElement videoElement : videoElements) {
            // Find the thumbnail and title elements within each video element
            WebElement thumbnailElement = videoElement.findElement(By.cssSelector("img"));
            WebElement titleElement = videoElement.findElement(By.cssSelector(".video-title"));

            // Verify that the thumbnail and title elements are present
            assertNotNull("Thumbnail not found", thumbnailElement);
            assertNotNull("Title not found", titleElement);

            // You can also check for specific attributes or properties of the elements if needed
            assertTrue("Thumbnail should have a source attribute", thumbnailElement.getAttribute("src").trim().length() > 0);

        }
    }

    @After
    public void tearDown() {
        // Close the WebDriver after the test
        if (driver != null) {
            driver.quit();
        }
    }
}

