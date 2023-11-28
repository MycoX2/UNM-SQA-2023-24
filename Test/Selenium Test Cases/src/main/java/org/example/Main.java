package org.example;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.time.Duration;

public class Main {

    public static void main(String[] args) {

        WebDriver driver = new ChromeDriver();
        driver.get("file:///C:/Users/hakee/OneDrive - University of Nottingham Malaysia/Y3 CSAI/Software Quality Assurance/UNM-SQA-2023-24/CW2 Hakeem - notes, share button/index.html");
        //find element - click "Software Quality Assurance"
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
        //enter text in text box in videoPlayer.html
        WebElement notesBox = driver.findElement(By.id("note-text"));
        String text = "pizza";

        notesBox.sendKeys(text);
        WebElement sendNoteButton = driver.findElement(By.id("add-note"));
        sendNoteButton.click();

        WebDriverWait wait2 = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait2.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[text()='Save']")));

        WebElement saveButton = driver.findElement(By.xpath("//*[text()='Save']"));
        saveButton.click();

        driver.navigate().refresh();

        WebElement finalSaveButton = driver.findElement(By.id("downloadlink"));
        finalSaveButton.click();

        filepresent();
    }
    public static ExpectedCondition<Boolean> filepresent() {
        return new ExpectedCondition<Boolean>() {
            @Override
            public Boolean apply(WebDriver driver) {
                File f = new File("C:/Downloads/info.txt");
                return f.exists();
            }

            @Override
            public String toString() {
                return String.format("file to be present within the time specified");
            }
        };
    }
}

