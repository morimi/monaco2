
describe('Category page', () => {
  let page
  beforeAll(async () => {
  })
  afterAll(async () => {
    await page.close()
  })

  it('rendered category page', async () => {
    page = await browser.visitPage('/category')
    const url = await page.url()
    const el = await page.$('.page-category')
    expect(url).toBe(BASE_URL + '/category')
    expect(el).toBeTruthy()
  })


  it('rendered game category page', async () => {
    page = await browser.visitPage('/category/game')
    //
     const el = await page.$('.page-category')
    // const ls = await page.$('.list-container')
     expect(el).toBeTruthy()
    // expect(ls).toBeTruthy()
    // expect(await el.$eval('.page-title', node => node.innerText)).toBe('「RPG」のアプリ一覧');
  })

})
