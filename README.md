# UI Test Automation Framework (WebdriverIO)
[Telnyx Test cases](https://docs.google.com/spreadsheets/d/1k9IGy5-sxBMZkcicNjDoE75M8jAOLg67xk_B3vyXx5c/edit?usp=sharing) 


## Summary of Repo

This repository contains a E2E UI test automation framework built with **WebdriverIO** and **TypeScript**.

---

## Requirements

To run this project locally, ensure you have the following installed on your system:

* **Node.js**: v20.0.0 or higher.
* **npm**: v9.0.0 or higher (comes with Node.js).
* **Browsers**: Google Chrome and/or Mozilla Firefox installed locally.
* **Docker**: If you plan to run the tests inside an isolated container.

---

## Steps to Install

**1. Clone the repository**

```bash
git clone https://github.com/rcorded/Task7_WebdriverIO_framework
cd Task7_WebdriverIO_framework

```

**2. Install dependencies**
Install all required npm packages (WebdriverIO, TypeScript, Allure, Faker, etc.):

```bash
npm install

```

**3. Configure Environment Variables**
Create a `.env` file in the root directory of the project to set up the base URL. This file is ignored by Git for security purposes.

```bash
# Create a .env file and add the following line:
BASE_URL=https://telnyx.com

```

---

## Steps to Launch

The project includes pre-configured npm scripts to run tests in various modes (headed, headless, specific browsers, or single files).

### Run All Tests

* **Run sequentially on Chrome then Firefox:**
```bash
npm run test:all

```


* **Run a complete CI cycle (Clean reports -> Run Chrome Headless -> Generate Report):**
```bash
npm run test:full

```



### Run Tests by Browser

* **Chrome (UI mode):**
```bash
npm run test:chrome

```


* **Chrome (Headless mode - for CI/CD):**
```bash
npm run test:chrome:headless

```


* **Firefox (UI mode):**
```bash
npm run test:firefox

```


* **Firefox (Headless mode):**
```bash
npm run test:firefox:headless

```



### Run a Single Spec File

To run a specific test file, use the `single` scripts and provide the path to your file after `--`.

* **Single file in Chrome (UI):**
```bash
npm run test:chrome:single -- ./test/specs/customerStories.spec.ts

```


* **Single file in Chrome (Headless):**
```bash
npm run test:chrome:single:headless -- ./test/specs/customerStories.spec.ts

```

---

## Running Tests in Docker
You can run the entire test suite inside an isolated Docker container. This ensures 100% consistency across different environments and CI/CD pipelines.

1. Build the Docker Image
Run this command from the root of your project to create the image containing Node.js, Google Chrome, and your framework:

```Bash
docker build -t wdio-tests .
```

2. Run All Tests (Default behavior)
Run the container and mount a volume to extract the Allure results to your local machine. By default, this executes the test:chrome:headless script.

- Linux / macOS / Git Bash:

```Bash
docker run --rm -v $(pwd)/allure-results:/app/allure-results wdio-tests
```

- Windows (PowerShell):

```PowerShell
docker run --rm -v ${PWD}/allure-results:/app/allure-results wdio-tests
```

3. Run a Specific Test File in Docker
To override the default command and run a single file, append the npm script at the end of the Docker command:

```Bash
docker run --rm -v $(pwd)/allure-results:/app/allure-results wdio-tests npm run test:chrome:single:headless -- ./test/specs/solutions.spec.ts
```

---

## Steps to Creating the Report

This framework uses **Allure Reporter** to generate comprehensive HTML test reports.

**1. Clean old results (Optional but recommended before a new run)**
Removes the `allure-results` and `allure-report` directories from previous executions to avoid overlapping data.

```bash
npm run report:clean

```

**2. Execute your tests**
Run any of the test commands mentioned above. Raw data and screenshots of failed tests will be automatically saved in the `allure-results` folder.

**3. Generate the HTML report**
Processes the raw data and creates a viewable web report.

```bash
npm run report:generate

```

**4. Open the report**
Starts a local web server and opens the generated Allure dashboard in your default browser.

```bash
npm run report:open

```