package YouTubeAPI;

import org.junit.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class IsTextFileDownloaded {
    private WebDriver driver;

    @Before
    public void setUp() throws InterruptedException {

        WebDriver driver = new ChromeDriver();
        //change file path to where index.html is downloaded
        driver.get("file:///C:/Users/hakee/Downloads/UNM-SQA-2023-24-main/UNM-SQA-2023-24-main/index.html");

        // Wait for the page to load
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.className("video-container"))); // Assuming there's an element with id "videos"

        // Locate the first thumbnail and click it
        WebElement firstThumbnail = driver.findElement(By.className("video-container")); // Adjust the CSS selector based on your actual structure
        firstThumbnail.click();

        //wait for videoPlayer page to load
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        //enter text in text box in videoPlayer.html
        WebElement notesBox = driver.findElement(By.id("note-text"));
        String text = "pizza";

        //save note using both buttons
        notesBox.sendKeys(text);
        WebElement sendNoteButton = driver.findElement(By.id("add-note"));
        sendNoteButton.click();

        WebDriverWait wait2 = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait2.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[text()='Save']")));

        WebElement saveButton = driver.findElement(By.xpath("//*[text()='Save']"));
        saveButton.click();

        //refresh page
        driver.navigate().refresh();

        //download file
        WebElement downloadButton = driver.findElement(By.id("downloadlink"));
        downloadButton.click();
    }

    @Test
    public void CheckTextDownloaded(){
            IsFileDownloadedMethod fileCheck = new IsFileDownloadedMethod();
        //change path "downloadpath" to where index.html is downloaded. fileName should be info.txt.
            Assert.assertTrue(fileCheck.isFileDownloaded("C:/Users/hakee/Downloads", "info.txt"));
        }

    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}