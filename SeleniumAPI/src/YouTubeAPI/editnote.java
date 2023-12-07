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

public class editnote {

    private WebDriver driver;
    @Test
    public void IsNoteEdited(){

        System.setProperty("webdriver.chrome.driver", "C:\\selenium webdriver\\chromedriver\\chromedriver-win64 (3)\\chromedriver-win64\\chromedriver.exe");

        ChromeOptions chromeOptions = new ChromeOptions();
        chromeOptions.setBinary("C:\\selenium webdriver\\chrome-win64\\chrome.exe");

        WebDriver driver = new ChromeDriver(chromeOptions);

        //change file path to where index.html is downloaded
        driver.get("file:///C:\\Users\\Yue\\Downloads\\UNM-SQA-2023-24-main\\UNM-SQA-2023-24-main\\index.html");
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

        WebElement noteInput = driver.findElement(By.id("note-text"));
        noteInput.sendKeys("This is a test note content");

        // Explicitly wait for the Add Note button to be clickable
        WebDriverWait wait1 = new WebDriverWait(driver, Duration.ofSeconds(60));
        WebElement addNoteButton = wait1.until(ExpectedConditions.elementToBeClickable(By.id("add-note")));

        // Click the Add Note button after the note content is entered
        addNoteButton.click();

        // Explicitly wait for note elements to be present before fetching them
        List<WebElement> noteElements = wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.xpath("//ul[@id='notes-list']/li//textarea")));

        boolean noteFound = false;
        String expectedNoteContent = "This is a test note content";

        // Loop through each displayed note and check for a match
        for (WebElement noteElement : noteElements) {
            String displayedNoteContent = noteElement.getAttribute("value");
            if (displayedNoteContent.equals(expectedNoteContent)) {
                // Clear the existing note content
                noteElement.clear();

                // Enter new note content
                noteElement.sendKeys("New note content");



                noteFound = true;

                // Additional check: Verify the note content after editing
                List<WebElement> updatedNoteElements = wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(By.xpath("//ul[@id='notes-list']/li//textarea")));
                boolean noteEdited = false;
                for (WebElement updatedNoteElement : updatedNoteElements) {
                    String updatedNoteContent = updatedNoteElement.getAttribute("value");
                    if (updatedNoteContent.equals("New note content")) {
                        noteEdited = true;
                        break;
                    }
                }

                if (noteEdited) {
                    System.out.println("Note content edited successfully.");
                } else {
                    System.out.println("Failed to edit note content.");
                }

                break;
            }
        }

        if (!noteFound) {
            System.out.println("Note content not found in the displayed notes.");
        }
    }

    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
