import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import CategoryList from '@/components/CategoryList.vue'

import response from '@/test/data/categories.js'


const localVue = createLocalVue()
localVue.use(Vuex)


describe('components/CategoryList.vue ', () => {
  let state
  let actions
  let mutations
  let getters
  let store

  beforeEach(() => {
    state = {}
    actions = {}
    mutations = {}
    getters = {}

    store = new Vuex.Store({
      state,
      getters,
      actions,
      mutations
    })
  });


  it('renders .category-list', () => {
    const wrapper = shallowMount(CategoryList, { store, localVue })

    expect(wrapper.contains('.category-list')).toBe(true)

  });
});
