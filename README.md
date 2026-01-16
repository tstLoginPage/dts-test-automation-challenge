# HMCTS Test Automation Framework TypeScript-Playwright – Login Tests

## Installing and running

1. To these tests, you must have the following installed:
   - Node v20 or higher [Node Prebuilt Installer](https://nodejs.org/en/download/prebuilt-installer) or use `brew install node`
2. Clone this repository into your local machine using the terminal (Mac), CMD (Windows), or a GUI tool like SourceTree.
3. `npm install` to install the node depencies
4. `npx playwright install` to install the playwright browsers
5. `npx playwright test` to run all the test in the directory

## Working with the tests

To work with and extend the tests I recommend installing: 
- [VS Code](https://code.visualstudio.com/)
- [VS Code Playwright Extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

## Application under test

https://practicesoftwaretesting.com/ 

A free reference site with some interesting challenges hosted to practice testing. It's automatically republished and cleaned so data is not permanent. Users are created for reference.

Details of accounts etc at the github repository: https://github.com/testsmith-io/practice-software-testing/blob/main/README.md
 
## Design choices

Used Node, TypeScript and Playwright to create a test framework that is clean and reliable.
Used :
- Page object model meaning test code is separate from reusable page description.
- Data factory methods to create users
- Configured :
    - tsconfig.json - to include the relevant paths for compilation and code completion.
    - playwright.config.ts - configure baseURL, local and CI run configuration including browsers tested against and retries etc. Used two test reoprters to give an html version that is readable and has full debug information and a list reporter for local running and to be visible in console output to show the curennt tests and running order. Since the site under test uses 'data-test' as it's test id rather than Playwrights default 'data-testid'.
- Simple github workflow to run the tests when the repo is updated.
- Assertions are kept as often as possible in the test file for readability rather than in POM or framework.

## Ideas for improvement
With more tme improvments would be:
- adding a fixture to load the page object model to save having to create new pages in tests
- creating an auth setup, so that tests other than login can login once and share the authentication cookies etc to save logging in everytime
- Make sure test data is refactored to a file if it needs to be reused.
