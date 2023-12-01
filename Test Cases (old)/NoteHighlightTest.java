package org.example;

import org.junit.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class NoteHighlightTest {
    public static WebDriver driver;

    @Test
    public void IsListItemYellow(){
        WebDriver driver = new ChromeDriver();
        driver.get("file:///C:/Users/hakee/OneDrive - University of Nottingham Malaysia/Y3 CSAI/Software Quality Assurance/UNM-SQA-2023-24/CW2 Hakeem - notes, share button/index.html");
        //find element - click "Software Quality Assurance"
        WebElement SQAButton = driver.findElement(By.className("category-button"));
        SQAButton.click();
        WebElement searchButton = driver.findElement(By.id("search-button"));
        searchButton.click();

        // Wait for the page to load
        //WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        //wait.until(ExpectedConditions.presenceOfElementLocated(By.className("video-container"))); // Assuming there's an element with id "videos"
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

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
        String ListItemColor = driver.findElement(By.xpath("//li[last()]")).getCssValue("background-color");


        Assert.assertEquals("rgba(255, 255, 0, 1)", ListItemColor);
    }

    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
