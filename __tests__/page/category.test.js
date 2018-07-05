
describe('Index page', () => {
  let page
  beforeAll(async () => {
    page = await browser.newPage()
    await page.goto(BASE_URL + '/category/game')
  })
  afterAll(async () => {
    await page.close()
  })

  it('rendered category page', async () => {
    const el = await page.$('.page.page-category')
    const ls = await page.$('.list-container')
    expect(el).toBeTruthy()
    expect(ls).toBeTruthy()
    expect(await el.$eval('.page-title', node => node.innerText)).toBe('「ゲーム」のアプリ一覧');
  })


  it('rendered rpg category page', async () => {
    await page.goto(BASE_URL + '/category/game/rpg')
    const el = await page.$('.page.page-category')
    const ls = await page.$('.list-container')
    expect(el).toBeTruthy()
    expect(ls).toBeTruthy()
    expect(await el.$eval('.page-title', node => node.innerText)).toBe('「RPG」のアプリ一覧');
  })

})
