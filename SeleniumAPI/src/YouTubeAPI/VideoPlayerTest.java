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
    public void testVideoPlayerFunctionality() throws InterruptedException {
        // Find a video thumbnail
        WebElement thumbnailElement = driver.findElement(By.cssSelector("#videos .video-container img"));

        // Simulate a click on the thumbnail
        thumbnailElement.click();

        // Wait for the video player to load (adjust the time as needed)
        Thread.sleep(5000);

        // Find the YouTube player iframe
        WebElement iframeElement = driver.findElement(By.tagName("iframe"));
        driver.switchTo().frame(iframeElement);

        // Find the play button and click it
        WebElement playButton = driver.findElement(By.cssSelector(".ytp-large-play-button"));
        playButton.click();

        // Wait for the player to start playing (adjust the time as needed)
        Thread.sleep(10000);

        // Check if the player is in the "PLAYING" state
        assertTrue(isPlayerPlaying());

        // Switch back to the default content
        driver.switchTo().defaultContent();
    }

    private boolean isPlayerPlaying() {
        // Check if the player is in the "PLAYING" state
        String playButtonLabel = driver.findElement(By.cssSelector(".ytp-play-button")).getAttribute("aria-label");
        return playButtonLabel.equals("Pause keyboard shortcut k");
    }

    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
