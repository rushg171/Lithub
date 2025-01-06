const getLastPageNoFromHeaderLink = (headerLink)=>{
    let lastPageNo = parseInt((new URL(((headerLink.split(","))[1].split(";"))[0].slice(2,-1))).searchParams.get("page"))
    if(lastPageNo>25) return 25;
    return lastPageNo;
}

module.exports = getLastPageNoFromHeaderLink