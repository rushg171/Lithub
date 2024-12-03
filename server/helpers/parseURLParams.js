const urlParamsToJSON = (urlParamString)=>{
   return Object.fromEntries(new URLSearchParams(urlParamString));
}

module.exports = {
    urlParamsToJSON
}