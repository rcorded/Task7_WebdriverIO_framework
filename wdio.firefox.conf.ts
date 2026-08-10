import { config as sharedConfig } from './wdio.shared.conf';

export const config = {
    ...sharedConfig,
    capabilities: [{
        maxInstances: 3,
        browserName: 'firefox',
        acceptInsecureCerts: true,
        'moz:firefoxOptions': {
            args: process.env.HEADLESS === 'true' 
                ? [
                    '-headless', 
                    '-width=1920', 
                    '-height=1080',
                    '--no-sandbox',           
                    '--disable-dev-shm-usage'                    
                ] 
                : ['-width=1920', '-height=1080']
        }
    }]
};