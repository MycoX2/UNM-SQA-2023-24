package YouTubeAPI;

import org.junit.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.time.Duration;

public class DoesTextFileHaveNotes {
    private WebDriver driver;
    BufferedReader reader;
    private boolean FileHasNotes;

    @Test
    public void setUp() throws InterruptedException, IOException {

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

        //sleep to allow file reading
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

        try {
            String fileName = "C:/Users/hakee/Downloads/info.txt";
            FileReader input = new FileReader(fileName);
            reader = new BufferedReader(input);
            reader.readLine();
            String line = reader.readLine();

            if (line != null) {
                FileHasNotes = true;
            } else
                FileHasNotes = false;

            reader.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        Assert.assertTrue(FileHasNotes);
    }
    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}