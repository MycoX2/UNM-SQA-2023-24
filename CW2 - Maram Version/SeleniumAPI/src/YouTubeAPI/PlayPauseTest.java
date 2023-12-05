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
public class PlayPauseTest {
    private WebDriver driver;

    @Before
    public void setUp() throws InterruptedException {
        driver = new ChromeDriver();
        driver.get("C:\\Users\\maram\\Desktop\\Software Quality Assurance\\UNM-SQA-2023-24\\videoPlayer.html");
        driver.manage().window().maximize();
        Thread.sleep(5000);
    }

    @Test
    public void testPlayerControls() throws InterruptedException {
       // Assuming there's a dedicated player area with video playing
    
       // Hover the mouse cursor over the video to display the control panel
       WebElement videoPlayer = driver.findElement(By.cssSelector("#video-player"));
       Actions action = new Actions(driver);
       action.moveToElement(videoPlayer).perform();
    
       // Click "Pause" button while the video is playing
       WebElement pauseButton = driver.findElement(By.cssSelector("#pause-button"));
       pauseButton.click();
       Thread.sleep(2000); // Give some time for the video to pause
    
       // Verify that the video playback is paused
       assertTrue(isVideoPaused());

       // Click the "Play" button to resume playback
       WebElement playButton = driver.findElement(By.cssSelector("#play-button"));
       playButton.click();
       Thread.sleep(2000); // Give some time for the video to resume
    
       // Verify that the video playback is resumed
       assertFalse(isVideoPaused());
    }

       // Function to check if the video is paused
       private boolean isVideoPaused() {
       WebElement videoElement = driver.findElement(By.cssSelector("#video-element"));
        return (Boolean) ((JavascriptExecutor) driver)
            .executeScript("return arguments[0].paused;", videoElement);
    }

    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        } 
    }
}
