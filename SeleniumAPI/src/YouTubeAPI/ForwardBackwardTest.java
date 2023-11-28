package YouTubeAPI;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.Assert.*;

public class FowardBackwardTest {

    private WebDriver driver;

    @Before
    public void setUp() throws InterruptedException {
        driver = new ChromeDriver();
        driver.get("C:\\Users\\maram\\Desktop\\Software Quality Assurance\\UNM-SQA-2023-24\\videoPlayer.html");
        driver.manage().window().maximize();
        Thread.sleep(5000);
    } 

    @Test
    public void testFowardBackward () throws InterruptedException {
        // Assuming the videos are dynamically embedded from YouTube API

        // Simulate the action of clicking the progress bar at 20% of the video duration
        clickProgressBar(0.2); // 20% of the video duration
        Thread.sleep(2000); // Give some time for the video to jump

        // Verify that the video jumps to the selected point
        assertEquals(0.2, getVideoProgress(), 0.01); // 20% tolerance for progress check

        // Simulate the action of clicking the progress bar at 80% of the video duration
        clickProgressBar(0.8); // 80% of the video duration
        Thread.sleep(2000); // Give some time for the video to jump

        // Ensure that the video skips to the selected point
        assertEquals(0.8, getVideoProgress(), 0.01); // 20% tolerance for progress check

        // Simulate the action of clicking the "Rewind" button to move backward by 10 seconds
        clickRewindButton();
        Thread.sleep(2000); // Give some time for the video to rewind

        // Verify that the video goes back by the specified time
        assertEquals(0.7, getVideoProgress(), 0.01); // 70% after rewinding 10 seconds
    }

    private void clickProgressBar(double percentage) {
        // Simulate the action of clicking the progress bar at a certain percentage
        // For example, if the YouTube API provides a method to seek to a specific point:
        // Sample code:
        // youtubePlayer.seekTo(percentage * totalVideoDuration);
    }

    private void clickRewindButton() {
        // Simulate the action of clicking the "Rewind" button
        // For example, if the YouTube API provides a method to rewind the video:
        // Sample code:
        // youtubePlayer.rewind(10); // Rewind by 10 seconds
    }

    private double getVideoProgress() {
        // Retrieve the current progress of the video
        // For example, if the YouTube API provides a method to get the current playback progress:
        // Sample code:
        // return youtubePlayer.getCurrentTime() / totalVideoDuration;
        return 0.0; // Placeholder, replace with actual logic using YouTube API
    }

    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
