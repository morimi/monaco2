
/**
 * e2e test of `/category/`
 */
describe('Category page test', () => {
  let page
  beforeAll(async () => {
    page = await browser.visitPage('/category')
  })
  afterAll(async () => {
    //await page.close()
  })

  it('rendered Category root page', async () => {
    const url = await page.url()
    expect(url).toBe(BASE_URL + '/category')

    //CategoryList.vue
    expect(await page.$('nav.category-list.component')).toBeTruthy()
  })

  it('rendered GAME Category page', async () => {
    const navigationPromise = page.waitForNavigation();
    await page.click('a[href="/category/game"]')
    await navigationPromise;
    //await page.goto(BASE_URL + '/category/game')

    expect(await page.url()).toBe(BASE_URL + '/category/game')

    const el = await page.$('.page.page-category')
    expect(el).toBeTruthy()
    // const ls = await page.$('.list-container')
    // expect(ls).toBeTruthy()

    //CategoryList.vue
    expect(await page.$('.page-category > nav.category-list.component')).toBeFalsy()

    //page title
    expect(await el.$eval('.page-title', node => node.innerText)).toBe('「ゲーム」のアプリ一覧');
  })

  //
  it('rendered GAME/RPG Category page', async () => {
    const navigationPromise = page.waitForNavigation();
    await page.click('a[href="/category/game/rpg"]')
    await navigationPromise;
    //await page.goto(BASE_URL + '/category/game/rpg')

    expect(await page.url()).toBe(BASE_URL + '/category/game/rpg')

    const el = await page.$('.page.page-category')
    expect(el).toBeTruthy()
    // const ls = await page.$('.list-container')
    // expect(ls).toBeTruthy()
    //page title
    expect(await el.$eval('.page-title', node => node.innerText)).toBe('「RPG」のアプリ一覧');
  })
})
