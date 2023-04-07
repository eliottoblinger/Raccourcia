const findHighestOccurences = (arr, max) => {
    const obj = arr.reduce((acc, curr) => {
        const occ = acc[curr] ? ++acc[curr] : acc[curr] = 1;

        return occ, acc
    }, {});

    return Object
        .keys(obj)
        .map(key => {
            return {
                item: key,
                occurences: obj[key]
            }
        })
        .sort((a,b) => b.occurences-a.occurences )
        .slice(0,max);
}

export { findHighestOccurences };
