// 检查数据类型
export const CheckType = {
  getTypeString(val: any) {
    return Object.prototype.toString.call(val).toLowerCase()
  },
  isString(val: any) {
    return this.getTypeString(val) === '[object string]'
  },
  isJsonString(val: any) {
    try {
      return typeof JSON.parse(val) === 'object'
    } catch (e) {
      return false
    }
  },
  isNumber(val: any) {
    return this.getTypeString(val) === '[object number]'
  },
  isBoolean(val: any) {
    return this.getTypeString(val) === '[object boolean]'
  },
  isArray(val: any) {
    return this.getTypeString(val) === '[object array]'
  },
  isNull(val: any) {
    return this.getTypeString(val) === '[object null]'
  },
  isUndefined(val: any) {
    return this.getTypeString(val) === '[object undefined]'
  },
  isFunction(val: any) {
    const type = this.getTypeString(val);
    return (type === '[object function]' || type === '[object asyncfunction]'
      || type === '[object promise]')
  },
  isObject(val: any) {
    return this.getTypeString(val) === '[object object]'
  },
  isError(val: any) {
    const type = this.getTypeString(val);
    return (type === '[object error]' || type === '[object errorevent]');
  },
  isRegexp(val) {
    return this.getTypeString(val) === '[object regexp]'
  }
}

const ua = navigator.userAgent.toLowerCase();

export const getBrowser = () => {
  const browsers = [
    {
      reg: /edge\/([\d.]+)/,
      name: 'Edge'
    },
    {
      reg: /rv:([\d.]+)\) like gecko/,
      name: 'IE'
    },
    {
      reg: /msie ([\d.]+)/,
      name: 'IE'
    },
    {
      reg: /firefox\/([\d.]+)/,
      name: 'Firefox'
    },
    {
      reg: /chrome\/([\d.]+)/,
      name: 'Chrome'
    },
    {
      reg: /opera.([\d.]+)/,
      name: 'Opera'
    },
    {
      reg: /version\/([\d.]+).*safari/,
      name: 'Safari'
    },
    {
      reg: /AppleWebKit\/([\d.]+).*mobile.*/i,
      name: 'webkit'
    }
  ]

  try {
    for (let {reg, name} of browsers) {
      const s = ua.match(reg);
      if (s && s[1]) {
        return `${name} ${s[1]}`
      }
    }
  } catch (e) {
    console.log(e);
  }
  return `unknow`;
}

// 判断浏览器类型
export function judgeBrand() {
  const brands = [
    {
      name: 'iPhone',
      reg: /iphone/i
    },
    {
      name: '华为',
      reg: /huawei/i
    },
    {
      name: '荣耀',
      reg: /honor/i
    },
    {
      name: 'Oppo',
      reg: [/oppo/i, /pacm00/i]
    },
    {
      name: 'Vivo',
      reg: /vivo/i
    },
    {
      name: '小米',
      reg: [/mi\s/i, /mix\s/i, /redmi/i]
    },
    {
      name: '三星',
      reg: /sm-/i
    }
  ]
  try {
    for (let {reg, name} of brands) {
      if (reg instanceof Array) {
        for (let i of reg) {
          if (i.test(ua)) {
            return name;
          }
        }
      } else {
        if (reg.test(ua)) {
          return name;
        }
      }
    }
  } catch (e) {
    return '';
  }
  return '';
}


// header信息转为json对象
export function headerToJson(headers) {
  const arr = headers.trim().split(/[\r\n]+/);
  const json: any = {};
  arr.forEach((item) => {
    const keyVal = item.split(': ');
    keyVal.length && (json[keyVal[0]] = keyVal[1]);
  })
  return json;
}