export const state = () => ({
  /**
   * デバイス
   * @type {'ios'|'android'?}
   */
  device: null,

  /**
   * プラットフォーム
   * @type {'pc'|'sp'?}
   */
  platform: null,

  agentInfo: {}
})

export const getters = {}

export const actions = {}

export const mutations = {
  setAgentInfo(state, data) {
    state.agentInfo = data
    state.device = data.DEVICE
    state.platform = data.PLATFORM
  }
}
