export default function () {
  const find = (str) => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    return userAgent.indexOf(str) !== -1
  }

  const device = {
    windows() {
      return find('windows')
    },
    iphone() {
      return !this.windows() && find('iphone')
    },
    ipod() {
      return find('ipod')
    },
    android() {
      return !this.windows() && find('android')
    },
    androidPhone() {
      return this.android() && find('mobile')
    }
  }

  return device.androidPhone() || device.iphone() || device.ipod()
}
