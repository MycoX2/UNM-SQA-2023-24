package YouTubeAPI;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.concurrent.TimeUnit;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class SearchKeywordsTest {

    private WebDriver driver;

    @Before
    public void setUp() throws InterruptedException {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
        driver.get("C:\\Users\\hakee\\OneDrive - University of Nottingham Malaysia\\Y3 CSAI\\Software Quality Assurance\\UNM-SQA-2023-24\\index.html");
        Thread.sleep(5000);
    } 
     

    @Test 
    public void testSearchKeywords() throws InterruptedException {
        //WebElement addKeywordButton = driver.findElement(By.id("addKeywordButton"));
        //addKeywordButton.click();
        WebElement SQAButton = driver.findElement(By.className("category-button"));
        SQAButton.click();

        // Click on search 
        WebElement searchButton = driver.findElement(By.id("search-button")); 
        searchButton.click();

        // Wait for the videos to load 
        Thread.sleep(5000); 

        // Check if the page loaded a collection of 12 short YouTube videos
        int numberOfVideosDisplayed = driver.findElements(By.cssSelector("#videos .video-container")).size();
        assertEquals("Expected 24 videos to be displayed", 24, numberOfVideosDisplayed);

        
        boolean keywordMatched = areVideosRelevantToKeyword("JavaScript", driver);
        assertTrue("Videos are not relevant to the keyword", keywordMatched);
    }

    // Helper method to check if video titles contain the specified keyword
    private boolean areVideosRelevantToKeyword(String keyword, WebDriver driver) {
        boolean keywordMatched = false;
        for (WebElement videoElement : driver.findElements(By.cssSelector("#videos .video-container"))) {
            WebElement titleElement = videoElement.findElement(By.cssSelector(".video-title"));
            String videoTitle = titleElement.getText().toLowerCase();
            if (videoTitle.contains(keyword.toLowerCase())) {
                keywordMatched = true;
                break;
            }
        }
        return keywordMatched;
    }

    /*@After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }*/
}

