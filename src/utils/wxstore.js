import wx from './wx'

class Storage {
  constructor(key) {
    this.key = key
  }
  async set (data) {
    const result = await wx.setStorage({
      key: this.key,
      data: data
    })
    return result;
  }
  async get () {
    const result = await wx.getStorage({ key: this.key})
    return result.data
  }
}

const StoreToken = new Storage('token') // 存用户的token

export {
  Storage,
  StoreToken
}
