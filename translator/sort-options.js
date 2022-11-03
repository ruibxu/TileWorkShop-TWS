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

const PROJECT_TYPE = {//This is the only one that can be safely changed
    TILESET: 0,
    TILEMAP: 1
}

export const ACCESS_TYPE = {
    VIEWABLE: 2,
    EDITABLE: 3,
    OWNER: 4,
    FAVORITE: 1
}

export const SEARCH_TYPE = {
    NAME: "name",
    CREATOR: "creator"
}

module.exports = {
    SORT_TYPE,
    SORT_ORDER,
    PROJECT_TYPE,
    ACCESS_TYPE,
    SEARCH_TYPE
}