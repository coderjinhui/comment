/**
 * fetch wrapper
 * @param url {string}
 * @param options {object}
 * @param [options.method=get]
 * @param [options.mode]
 * @param [options.headers]
 * @param [options.cache]
 * @param [options.redirect]
 * @param [options.referrer]
 * @return {Promise<Response>}
 * */
const request = (url, options) => {
  const _options = Object.assign({
    'method': 'GET',
    'credentials': 'same-origin',
    'mode': 'same-origin',
    'cache': 'default',
    'redirect': 'follow',
    'referrer': 'client',
    'headers': new Headers()
  }, options)
  _options.method = _options.method.toLocaleUpperCase().trim()
  const methodEnum = ['GET', 'OPTION', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH']
  if (!methodEnum.includes(_options.method)) {
    throw RangeError('Invalid Method: ' + _options.method)
  }
  if (_options.method === 'GET' || _options.method === 'HEAD') {
    // 删除不应该有body的请求
    if (_options.body) {
      console.warn(`${_options.method} should not has attribute BODY`)
      delete _options.body
    }
  } else if (_options.body instanceof FormData) {
    _options.headers.set('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8')
  } else {
    _options.body = JSON.stringify(_options.body)
    _options.headers.set('Content-Type', 'application/json;charset=UTF-8')
  }

  const parserBody = headers => {
    const contentTypeWithCharset = headers.get('Content-Type')
    let index = contentTypeWithCharset.indexOf(';')
    let contentType
    if (index > -1) {
      contentType = contentTypeWithCharset.substr(0, index)
      if (contentTypeWithCharset.length > contentType.length && contentTypeWithCharset.indexOf('charset=utf') < 0) {
        console.warn('response charset not utf8')
      }
    } else {
      contentType = contentTypeWithCharset
    }

    /**
     * content type 大致分五种
     * text/* image/* video/* audio/* application/*
     * 这里分三类处理，text，file，json
     * 还有一种是multipart，这个只在服务端使用
     * */
    if (contentType === 'application/json') {
      return 'json'
    } else if (contentType.startsWith('text/') || contentType.startsWith('application/')) {
      return 'text'
    } else {
      return 'file'
    }
  }

  let contentType

  const handleResponse = async response => {
    /**
     * todo response 还有arrayBuffer() 和 formData() 获取内容的两个方法
     * 另外还有clone() 方法
     * */
    contentType = parserBody(response.headers)
    if (response.ok) {
      if (contentType === 'json') {
        return response.json()
      } else if (contentType === 'text') {
        return response.text()
      } else {
        return response.blob()
      }
    } else {
      // handle error
      if (contentType === 'json') {
        response.entities = await response.json()
      } else if (contentType === 'text') {
        response.entities = await response.text()
      } else {
        // 一般情况下，如果出错，服务端是不会返回其他类型的内容的
        throw Error(contentType)
      }
      return Promise.reject(response)
    }
  }

  return (_options.method === 'HEAD' || _options.method === 'OPTION')
    ? fetch(url, _options)
    : fetch(url, _options)
      .then(response => handleResponse(response))
}