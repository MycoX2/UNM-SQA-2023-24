package YouTubeAPI;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.List;

import static org.junit.Assert.assertEquals;

public class SearchKeywordsTest {

    private WebDriver driver;

    @Before
    public void setUp() throws InterruptedException {
        driver = new ChromeDriver();
        driver.get("C:\\Users\\maram\\Desktop\\Software Quality Assurance\\UNM-SQA-2023-24\\index.html");
        driver.manage().window().maximize();
        Thread.sleep(5000);
    } 
     

    @Test 
    public void testSearchKeywords() throws InterruptedException {
        // Click on the predefined keywords button below the search bar
        WebElement javascriptButton = driver.findElement(By.cssSelector(".category-button[data-category='JavaScript']"));
        javascriptButton.click();
        Thread.sleep(2000);
   
        // Click on search
        WebElement searchButton = driver.findElement(By.id("search-button"));
        searchButton.click();
        Thread.sleep(5000);

        String expectedKeyword = "JavaScript"; // Replace with the expected keyword

        // Fetch actual result - count the number of videos loaded
        WebElement videosContainer = driver.findElement(By.id("videos"));
        int actualVideosCount = videosContainer.findElements(By.className("video-container")).size();

        // Expected Result: The page should load a collection of 12 short YouTube videos that are relevant to the keyword
        int expectedVideosCount = 12;

        // Assert the actual result against the expected result
        assertEquals(expectedVideosCount, actualVideosCount);

        int relevanceCount = 0;
        for (WebElement videoElement : videoElements) {
            WebElement videoTitleElement = videoElement.findElement(By.cssSelector(".video-title"));
            String videoTitle = videoTitleElement.getText();
    
            // Check if the keyword is present in the video title
            if (videoTitle.toLowerCase().contains(expectedKeyword.toLowerCase())) {
                relevanceCount++; 
            }
        }
    }

    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
