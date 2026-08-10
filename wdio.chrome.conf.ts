import { config as sharedConfig } from './wdio.shared.conf';

export const config = {
    ...sharedConfig,
    capabilities: [{
        maxInstances: 3,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: process.env.HEADLESS === 'true' 
                ? [
                    '--headless', 
                    '--disable-gpu', 
                    '--window-size=1920,1080',
                    '--no-sandbox',              
                    '--disable-dev-shm-usage'     
                
                ] 
                : ['--window-size=1920,1080']
        }
    }]
};