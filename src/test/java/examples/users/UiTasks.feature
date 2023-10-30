@karate
Feature: Demo site form registration

  Background: configure the driver
    * configure driver = {type: 'chromedriver', executable: 'C:/Program Files/Google/Chrome/Application/chrome.exe'}

  Scenario Outline: Demo site form registration
    Given driver 'https://www.techlistic.com/p/selenium-practice-form.html'
    And maximize()
    And delay(2000)
    And input("//input[@name='firstname']", "<name>")
    And input("input[name='lastname']']", "<lastName>")
    And click("//input[@id='sex-0']")
    And click("//input[@id='exp-4']")
    And input("//input[@id='datepicker']", "<date>")
    And click("//input[@id='profession-1']")
    And click("//input[@id='tool-2']")
    And scroll("//select[@id='continents']")
    And select("//select[@id='continents']", 'Asia')

  Examples:
    | name | lastName | date       |
    | vikas| N        | 15/10/2023 |
    | Raju | B        | 12/8/2021  |


  Scenario: Sign in and sign out
    Given driver "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    And delay(2000)
    And input("//input[@placeholder='Username']", "Admin")
    And input("//input[@placeholder='Password']", "admin123")
    Then click("//button[normalize-space()='Login']")
    And delay(2000)
    And match text("//h6[normalize-space()='Dashboard']") == 'Dashboard'
    And click(".oxd-userdropdown-tab")
    And click("//a[normalize-space()='Logout']")
    Then assert exists('//div[@class='orangehrm-login-branding']')