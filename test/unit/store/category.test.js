import { actions } from '@/store/category.js'
import categories from '@/test/data/categories.js'


describe('store/category.js category store テスト', () => {
  const commit = jest.fn()

  const state = {
    categories: categories
  }

  afterEach(() => {
    commit.mockReset()
  })

  it('fetchCategories: call from `/category/`', () => {
    actions.fetchCategories({ commit, state, rootState }, { parent: undefined, slug: undefined, page:1})
    expect(commit.mock.calls.length).toBe(0);
  });

  it('fetchCategories: call from `/category/game`', () => {
    actions.fetchCategories({ commit, state, rootState }, { parent: 'game', slug: undefined, page:1})
    expect(commit.mock.calls.length).toBe(1);
    expect(commit.mock.calls).toEqual([['setCategory',
      categories.game
    ]]);
  });

  it('fetchCategories: call from `/category/game/rpg`', () => {
    actions.fetchCategories({ commit, state, rootState }, { parent: 'game', slug: 'rpg', page:1})
    expect(commit.mock.calls.length).toBe(1);
    expect(commit.mock.calls).toEqual([['setCategory',
      categories.game.child.find(cat => cat.slug === 'rpg')
    ]]);
  });

});
