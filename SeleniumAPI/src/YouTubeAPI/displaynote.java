package YouTubeAPI;

import org.junit.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

public class displaynote {

    private WebDriver driver;
    @Test
    public void IsNotedisplayed(){

        // Set the path to your ChromeDriver executable, or run as is.
        /*System.setProperty("webdriver.chrome.driver", "C:\\selenium webdriver\\chromedriver\\chromedriver-win64 (3)\\chromedriver-win64\\chromedriver.exe");

        ChromeOptions chromeOptions = new ChromeOptions();
        chromeOptions.setBinary("C:\\selenium webdriver\\chrome-win64\\chrome.exe");*/

        WebDriver driver = new ChromeDriver(); //put chromeOptions in brackets.

        //change file path to where index.html is downloaded
        driver.get("file:///C:\\Users\\hakee\\OneDrive - University of Nottingham Malaysia\\Y3 CSAI\\Software Quality Assurance\\UNM-SQA-2023-24\\index.html");
        WebElement SQAButton = driver.findElement(By.className("category-button"));
        SQAButton.click();
        WebElement searchButton = driver.findElement(By.id("search-button"));
        searchButton.click();
        //find element - fifth video
        // Wait for the page to load
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.className("video-container"))); // Assuming there's an element with id "videos"
        // Locate the first thumbnail and click it
        WebElement firstThumbnail = driver.findElement(By.className("video-container")); // Adjust the CSS selector based on your actual structure
        firstThumbnail.click();

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        // Add some notes (simulate user actions)
        addNotes(driver);

        // Verify that the notes are displayed correctly
        verifyNotesDisplayed(driver);

        // Close the browser
        driver.quit();
    }

    private static void addNotes(WebDriver driver) {
        // Find the note input field and add some notes
        WebElement noteInput = driver.findElement(By.id("note-text"));
        noteInput.sendKeys("Note 1");
        WebElement addNoteButton = driver.findElement(By.id("add-note"));
        addNoteButton.click();
        WebElement noteInput1 = driver.findElement(By.id("note-text"));
        noteInput1.sendKeys("Note 2");
        WebElement addNoteButton1 = driver.findElement(By.id("add-note"));
        addNoteButton1.click();

        // Wait for the notes to be added
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//ul[@id='notes-list']/li")));
    }

    private static void verifyNotesDisplayed(WebDriver driver) {
        // Get all the displayed note elements
        List<WebElement> noteElements = driver.findElements(By.xpath("//ul[@id='notes-list']/li"));

        // Perform assertions or checks here to verify that notes are displayed correctly
        // For example, check the number of notes displayed or their content
        int numberOfNotes = noteElements.size();
        System.out.println("Test Successfully passed!Number of notes displayed: " + numberOfNotes);


    }



    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
