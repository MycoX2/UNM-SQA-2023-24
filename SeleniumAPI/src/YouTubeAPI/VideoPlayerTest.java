package YouTubeAPI;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.Assert.*;
public class VideoPlayerTest {
    private WebDriver driver;

    @Before
    public void setUp() throws InterruptedException {
        driver = new ChromeDriver();
        driver.get("C:\\Users\\loh27\\Documents\\Year3\\Software Quality Assurance\\UNM-SQA-2023-24\\index.html");
        driver.manage().window().maximize();
        Thread.sleep(5000);
    }

    @Test
    public void testVideoPlayerFunctionality () throws InterruptedException {
        // Find a video thumbnail
        WebElement thumbnailElement = driver.findElement(By.cssSelector("#videos .video-container img"));

        // Get the current URL before clicking the thumbnail
        String initialUrl = driver.getCurrentUrl();

        // Simulate a click on the thumbnail
        thumbnailElement.click();

        // Wait for the navigation to the video player page (adjust the time as needed)
        Thread.sleep(5000);

        // Get the current URL after clicking the thumbnail
        String currentUrl = driver.getCurrentUrl();

        // Check if the browser navigated to the expected page
        assertNotEquals("The video player page did not open", initialUrl, currentUrl);
        assertTrue("The current URL does not contain 'videoPlayer.html'", currentUrl.contains("videoPlayer.html"));

    }

    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
