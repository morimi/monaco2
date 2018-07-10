
describe( '/ (Home Page)', () => {
    let page;
    beforeAll(async () => {
      page = await browser.newPage()
      await page.goto(BASE_URL);
    });
    afterAll(async () => {
      await page.close()
    })

    it('rendered index page', async () => {
      const el = await page.$('.site')
      expect(el).toBeTruthy()
    })

    it('rendered official tweet component', async () => {
      const el = await page.$('#newest-official-tweet')
      expect(el).toBeTruthy()
    })

    it('rendered user tweet component', async () => {
      const el = await page.$('#newest-user-tweet')
      expect(el).toBeTruthy()
    })

    it('rendered video component', async () => {
      const el = await page.$('#newest-video')
      expect(el).toBeTruthy()
    })

    it('rendered category-list component', async () => {
      const text = await page.evaluate(() => document.body.textContent);
      expect(text).toContain('カテゴリー一覧');
    })
});
