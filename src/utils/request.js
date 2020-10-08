import { promisifyAll } from 'miniprogram-api-promise'
import { StoreToken } from './wxstore'
import config from '@/config/index'
import { Store } from 'vuex'
const pending = {} // 避免重复请求

const isHttpSuccess = (status) => {
  return status >= 200 && status < 300
}

const errorHandle = (res) => {
  console.log(res)
  wx.showToast({
    title: res.data && res.data.msg ? res.data.msg : '请求异常',
    duration: 2000,
    icon: 'none'
  })
}


export const request = async (options = {}) => {
  // 考虑与微信的接口进行兼容，因此有个options
  const {success, fail} = options
  const key = options.url + '&' + (options.method || 'GET')
  let isPublic = false
  config.publicPath.map((path) => {
    isPublic = isPublic || path.test(options.url)
  })
  await StoreToken.set('11122222')
  const token = await StoreToken.get()
  let header = {}
  if (!isPublic && token) {
    header = Object.assign({
      'Authorization' : 'Bearer ' + token
    }, options.header)
  }
  // if (!isPublic && token) {
  //  const header = Object.assign({}, options.header)
  // }
  const result = new Promise((resolve, reject) => {
    wx.showLoading()
  const handler = wx.request(Object.assign({}, options,{
     header,
     success: (res) => {
       delete pending[key] // 如果请求完成则删除
       if (isHttpSuccess(res.statusCode)) {
         if(success) {
          success(res)
          return
         }
         resolve(res.data)
       } else {
        errorHandle(res)
        reject(res)
       }
     },
     fail: (err) => {
      delete pending[key] // 如果请求完成则删除
      errorHandle(err)
      if (fail) {
        fail(err)
         return
        }
       reject(err)
     },
     complete: () => {
       wx.hideLoading()
     }
   }))
   if (pending[key]) { // 如果有重复请求则取消该请求
     pending[key].abort()
   }
   setTimeout(() => { // 如果不是重复请求则存该请求
     pending[key] = handler
   },0)
  })
  return result
}

export const axios = {
  get (url,data) {
    return request({
      url,
      data,
      method:'GET'
    })
  },
  post (url,data) {
    return request({
      url,
      data,
      method:'POST'
    })
  }
}
