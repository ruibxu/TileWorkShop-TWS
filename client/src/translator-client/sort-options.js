//NOTE: use these varible names and not the values
export const SORT_TYPE = {//DON'T CHANGE THESE
    NAME: "name",
    VIEW: "community.views",
    LIKE: "community.likes",
    RECENT: "lastEdited"
}

export const SORT_ORDER = {
    ASCENDING: -1,
    DESCENDING: 1
}

export const PROJECT_TYPE = {//This is the only one that can be safely changed
    TILESET: 0,
    TILEMAP: 1
}

export const ACCESS_TYPE = {
    VIEWABLE: 1,
    EDITABLE: 2,
    OWNER: 3,
    FAVORITE: 0
}

export const SEARCH_TYPE = {
    NAME: "name",
    CREATOR: "creator"
}