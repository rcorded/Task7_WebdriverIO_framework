import 'dotenv/config';

export const config: WebdriverIO.Config = {
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './test/specs/**/*.ts'
    ],
    exclude: [],
    
    // ===================
    // Test Configurations
    // ===================
    maxInstances: 3,
    logLevel: 'info',
    bail: 0,
    baseUrl: process.env.BASE_URL,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    
    reporters: ['spec', ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
    }]],
    
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    
    // =====
    // Hooks
    // =====
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            await browser.takeScreenshot();
        }
    }
}