import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import puppeteer from 'puppeteer-core';

@Injectable()
export class AmazonService {
    constructor(private readonly configService: ConfigService){}

    async getProducts(products: string) {
        // create headless browser client
        const browser = await puppeteer.connect({
            browserWSEndpoint: this.configService.getOrThrow('SBR_WS_ENDPOINT')
        });
        try {
            // new browser page
            const page = await browser.newPage();
            page.setDefaultNavigationTimeout(2 * 60 * 1000); // 2 ms
            await Promise.all([
                page.waitForNavigation(),
                page.goto("https://amazon.com"), // site to srap
            ])
            // getting html selector using inspect element
            await page.type('#twotabsearchtextbox', products);
            await Promise.all([
                page.waitForNavigation(),
                page.click('#nav-search-submit-button'),
            ]);
            // parse the result using query selector func
            return await page.$$eval('.s-search-results .s-card-container', (results) => {
                return results.map(r => {
                    const url = r.querySelector('a').href;
                    const title = r.querySelector('.s-title-instructions-style span')?.textContent;
                    const price = r.querySelector('.a-price .a-offscreen').textContent
                    return { url, title, price};
                })
            })
        } finally {
            await browser.close();
        }
    }
}
