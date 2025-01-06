const setRepoField = (repoObjectId, docs)=>{
    return docs.map(doc=>{
        delete doc.id;
        doc.repo = repoObjectId;
        return doc;
    })
}

module.exports = setRepoField;