import { IRequest, IResponse } from './message'

export const isTextBody = (payload: IRequest | IResponse) => {
  if (!payload) return false
  if (!payload.header) return false
  if (!payload.header['Content-Type']) return false

  return /text|javascript|json/.test(payload.header['Content-Type'].join(''))
}

export const getSize = (response: IResponse) => {
  if (!response) return '0'
  if (!response.header) return '0'

  let len
  if (response.header['Content-Length']) {
    len = parseInt(response.header['Content-Length'][0])
  } else if (response && response.body) {
    len = response.body.byteLength
  }
  if (!len) return '0'
  if (isNaN(len)) return '0'
  if (len <= 0) return '0'

  if (len < 1024) return `${len} B`
  if (len < 1024*1024) return `${(len/1024).toFixed(2)} KB`
  return `${(len/(1024*1024)).toFixed(2)} MB`
}