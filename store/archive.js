import axios from 'axios';

export const state = () => ({
  posts: [],

  post: null,

  app_type: null,

  /**
  * @type {{name: string, slug: string}}
  */
  category: null,

  error: null
})

export const getters = {}

export const actions = {

  /**
   * カテゴリーに登録されたアプリの一覧を得る
   * @prop {{name: string, slug: string}} params 'category/game/rpg' -> name:'game', slug:'rpg'
   */
  async fetchArchive({ commit, state, rootState }, params) {
    let cat;

    //ルートストアのカテゴリーリストからparams.slugに該当するカテゴリーを探す
    if(params.name && params.slug) {
      cat = rootState.categories[params.name].child.find(cat => cat.slug === params.slug);

    //params.nameに該当するカテゴリーがあったらワンチャン
    } else if(/^(game|app)$/.test(params.name) && !params.slug) {
      cat = rootState.categories[params.name];
    }

    //カテゴリ情報がなかった
    if(!cat) {
      return commit('setError', { message: 'Category not found', statusCode: 404 })
    }

    await axios.get('http://localhost:8888/wp-json/wp/v2/posts/?categories=' + cat.id )
    .then( res => {
      commit('setParam', params)
      commit('setCategory', cat)
      return commit('setPosts', res.data);
    }).catch((e)=>{
      return commit('setError', { message: 'Category not found', statusCode: 404 })
    })
  }


}
/*
this.app_type = to.params.name; //app|game
this.posts = res.data;
this.name = cat.name;
this.slug = cat.slug;
this.id = cat.id;
*/
export const mutations = {
  setPosts(state, data) {
    state.posts = data
  },

  setParam(state, params) {
    state.app_type = params.name
  },

  setCategory(state, cat) {
    state.category = cat
  },

  setError(state, data) {
    state.error = data
  }
}
