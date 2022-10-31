//NOTE: use these varible names and not the values
const SORT_TYPE = {//DON'T CHANGE THESE
    NAME: "name",
    VIEW: "community.views",
    LIKE: "community.likes",
    RECENT: "lastEdited"
}

const SORT_ORDER = {
    ASCENDING: -1,
    DESCENDING: 1
}

const SEARCH_TYPE = {//This is the only one that can be safely changed
    TILESET: 0,
    TILEMAP: 1
}
module.exports = {
    SORT_TYPE,
    SORT_ORDER,
    SEARCH_TYPE
}