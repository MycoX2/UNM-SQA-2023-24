package YouTubeAPI;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class AddKeywordTest {

    private WebDriver driver;

    @Before
    public void setUp() throws InterruptedException {
        driver = new ChromeDriver();
        driver.get("C:\\Users\\maram\\Desktop\\Software Quality Assurance\\UNM-SQA-2023-24\\index.html");
        driver.manage().window().maximize();
        Thread.sleep(5000);
    } 

    @Test
    public void testAddKeyword() throws InterruptedException {
    
        WebElement addKeywordButton = driver.findElement(By.id("addKeywordButton"));
        addKeywordButton.click();

        // Enter the desired text into the textbox
        String customKeyword = "Testing"; // Replace with the desired custom keyword
        WebElement customKeywordInput = driver.findElement(By.id("customKeyword"));
        customKeywordInput.sendKeys(customKeyword);

        // Click on 'Save'
        WebElement saveButton = driver.findElement(By.id("submitKeyword"));
        saveButton.click(); 

        // Fetch the added keyword element
        WebElement addedKeyword = driver.findElement(By.xpath("//button[@class='category-button' and text()='" + customKeyword + "']"));

        // Test Data: Keywords
        String expectedKeyword = "Testing";

        assertEquals(expectedKeyword, addedKeyword.getText());

         // Check functionality by clicking the added keyword
         addedKeyword.click();
    }
    
    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
