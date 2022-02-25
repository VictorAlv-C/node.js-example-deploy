exports.filterObj = (obj, ...attFilter) => {
    const postFilter = {};

    Object.keys(obj).forEach(prop => {
        if(attFilter.includes(prop)){
            postFilter[prop] = obj[prop];
        }
    })

    return postFilter;
}

