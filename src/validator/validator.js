const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true
  }
  
  const isValidUrl = function (value) {
    const regEx = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
    const result = regEx.test(value)
    return result
  }
  
  const isValidcollegeName = function (value) {
    const regEx = /^\s*([a-zA-Z\.]){2,8}\s*$/
    const result = regEx.test(value)
    return result
  }
  
  const isValidName = function (value) {
    const regEx = /^\s*([a-zA-Z\s\,\.]){2,100}\s*$/
    const result = regEx.test(value)
    return result
  }
  
  const isValidNumber = function (value) {
    const regEx = /^\s*\91([0-9]){10}\s*$/
    const result = regEx.test(value)
    return result
  }
  
  const isValidEmail = (value) => {
    if (typeof value === "undefined" || value === null) return false
    const regEx = /^\s*(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/
    const result = regEx.test(value)
    return result
  }
  
  module.exports.isValid = isValid;
  module.exports.isValidUrl = isValidUrl;
  module.exports.isValidcollegeName = isValidcollegeName;
  module.exports.isValidName = isValidName;
  module.exports.isValidNumber = isValidNumber;
  module.exports.isValidEmail = isValidEmail;