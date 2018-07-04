
describe('Index page', () => {
  let page
  beforeAll(async () => {
    page = await browser.newPage()
    await page.goto('/category/game')
  })
  afterAll(async () => {
    await page.close()
  })

  it('rendered category page', async () => {
    const el = await page.$('.page.page-category')
    expect(el).toBeTruthy()
  })

  it('rendered official tweet component', async () => {
    const el = await page.$('#newest-official-info')
    expect(el).toBeTruthy()
  })
})
