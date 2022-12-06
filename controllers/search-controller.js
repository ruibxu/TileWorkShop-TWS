const TileMap = require('../models/tilemap-model')
const TileSet = require('../models/tileset-model')
const User = require('../models/user-model')
const Comment = require('../models/comment-model');
const { SORT_TYPE, SORT_ORDER, PROJECT_TYPE, ACCESS_TYPE, SEARCH_TYPE } = require('../translator/sort-options')
const ObjectId = require('mongoose').Types.ObjectId;
/*
NOTE TO TESTER:
commonly used veriable types (if applicable)
REQUIRED "params.type": get values from translantor/sort-options PROJECT_TYPE
REQUIRED "body.sort_type": get values from translantor/sort-options SORT_TYPE

OPTIONAL "body.searcher_id": fill if user is logged in
OPTIONAL "body.order": get values from translantor/sort-options SORT_ORDER
OPTIONAL "body.search_value": whatever they type in the search bar
OPTIONAL "body.limit": the number of items you want back Defaults to 6
*/

const getUsernameByIds = async (req, res) => {
    const user_ids = req.body.user_ids //REQUIRED a list of userids to get the names of

    if (!user_ids) {
        return res.status(200).json({ mappings: [] })
    }
    const users = await User.find({ _id: { $in: user_ids } })
    const mapping = users.map((x) => ({
        _id: x._id,
        username: x.username
    }));
    return res.status(200).json({ mappings: mapping })
}

const getViewableProjects = async (req, res) => {
    //optional {searcher_id: provide if logged in}
    const Search = (req.params.type == PROJECT_TYPE.TILEMAP) ? TileMap : TileSet;
    const userid = req.body.searcher_id;
    if (!userid) {
        results = await Search.find({ ['access.public']: true })
    }
    else {
        results = await Search.find({
            $or: [
                { ['access.public']: true },
                { ['access.owner_id']: userid },
                { ['access.editor_ids']: userid },
                { ['access.viewer_ids']: userid }
            ]
        }).sort({ [`${SORT_TYPE.RECENT}`]: SORT_ORDER.DESCENDING })
    }
    if (!results) {
        return res.status(404).json({
            success: false,
            message: "Nothing Found"
        })
    }
    const mapped = results.map(x => ({
        _id: x._id,
        name: x.name,
        access: x.access,
        community: x.community,
        lastEdited: x.lastEdited,
        type: req.params.type
    }))
    return res.status(200).json({
        success: true,
        type: req.params.type,
        list: mapped
    })
}

const getEditableProjects = async (req, res) => {
    //REQUIRED {searcher_id: need to be logged in}
    const Search = (req.params.type == PROJECT_TYPE.TILEMAP) ? TileMap : TileSet;
    const userid = req.body.searcher_id;
    if (!userid) {
        return res.status(400).json({
            success: false,
            message: "Authentication error"
        })
    }
    else {
        results = await Search.find({
            $or: [
                { ['access.owner_id']: userid },
                { ['access.editor_ids']: userid },
            ]
        }).sort({ [`${SORT_TYPE.RECENT}`]: SORT_ORDER.DESCENDING })
    }
    if (!results) {
        return res.status(404).json({
            success: false,
            message: "Nothing Found"
        })
    }
    const mapped = results.map(x => ({
        _id: x._id,
        name: x.name,
        access: x.access,
        community: x.community,
        lastEdited: x.lastEdited,
        type: req.params.type
    }))
    return res.status(200).json({
        success: true,
        type: req.params.type,
        list: mapped
    })
}

const getFavoriteProjects = async (req, res) => {
    //required: {searcher_id:}
    const Search = (req.params.type == PROJECT_TYPE.TILEMAP) ? TileMap : TileSet;
    const userid = req.body.searcher_id
    if (!userid) {
        return res.status(400).json({
            success: false,
            message: "Authentication error"
        })
    }
    else {
        results = await Search.find({
            $and: [
                {
                    $or: [
                        { ['access.public']: true },
                        { ['access.owner_id']: userid },
                        { ['access.editor_ids']: userid },
                        { ['access.viewer_ids']: userid }
                    ]
                },
                { ['community.favorited_Users']: userid }
            ]
        }).sort({ [`${SORT_TYPE.RECENT}`]: SORT_ORDER.DESCENDING })
    }
    if (!results) {
        return res.status(404).json({
            success: false,
            message: "Nothing Found"
        })
    }
    const mapped = results.map(x => ({
        _id: x._id,
        name: x.name,
        access: x.access,
        community: x.community,
        lastEdited: x.lastEdited,
        type: req.params.type
    }))
    return res.status(200).json({
        success: true,
        type: req.params.type,
        list: mapped
    })
}

const searchProject = async (req, res) => {
    //required: {searcher_id:}
    const Search = (req.params.type == PROJECT_TYPE.TILEMAP) ? TileMap : TileSet;
    const userid = req.body.searcher_id
    const sort_type = req.body.sort_type
    const order = req.body.order
    const skip = (req.body.skip) ? req.body.skip : 0
    if (!order) {
        if (sort_type == SORT_TYPE.NAME) { order = SORT_ORDER.ASCENDING }
        else { order = SORT_ORDER.DESCENDING }
    }
    const search_value = req.body.search_value ? req.body.search_value : ''
    const limit = req.body.search_value ? req.body.search_value : 6
    conditions = sort_type ? { [`${sort_type}`]: order } : {}
    if (!userid) {
        results = await Search.find({
            $and: [
                { ['access.public']: true },
                { name: { "$regex": search_value, "$options": "i" } }
            ]
        }).sort(conditions).skip(skip).limit(limit)
    }
    else {
        results = await Search.find({
            $and: [
                {
                    $or: [
                        { ['access.public']: true },
                        { ['access.owner_id']: userid },
                        { ['access.editor_ids']: userid },
                        { ['access.viewer_ids']: userid }
                    ]
                },
                { name: { "$regex": search_value, "$options": "i" } }
            ]
        }).sort(conditions).skip(skip).limit(limit)
    }
    if (!results) {
        return res.status(404).json({
            success: false,
            message: "Nothing Found"
        })
    }
    const mapped = results.map(x => ({
        _id: x._id,
        name: x.name,
        access: x.access,
        community: x.community,
        lastEdited: x.lastEdited,
        type: req.params.type
    }))
    return res.status(200).json({
        success: true,
        type: req.params.type,
        list: mapped
    })
}

const searchUsers = async (req, res) => {
    //REQUIRED req.body.exact: boolean
    const search_value = req.body.search_value ? req.body.search_value : ''
    const limit = req.body.search_value ? req.body.search_value : 6
    const skip = (req.body.skip) ? req.body.skip : 0
    conditions = (req.body.exact) ? { username: search_value } : { username: { "$regex": search_value, "$options": "i" } }
    results = await User.find(
        conditions
    ).sort({ username: -1 }).skip(skip).limit(limit)
    if (!results) {
        return res.status(404).json({
            success: false,
            message: "Nothing Found"
        })
    }
    const map = results.map((x) => ({
        _id: x._id,
        username: x.username
    }))
    return res.status(200).json({
        success: true,
        list: map
    })
}

const searchProjectByUsers = async (req, res) => {
    //REQUIRED req.body.id_list list of user_ids
    const id_list = req.body.id_list
    const Search = (req.params.type == PROJECT_TYPE.TILEMAP) ? TileMap : TileSet;
    const userid = req.body.searcher_id
    const sort_type = req.body.sort_type
    const order = req.body.order
    const skip = (req.body.skip) ? req.body.skip : 0
    if (!order) {
        if (sort_type == SORT_TYPE.NAME) { order = SORT_ORDER.ASCENDING }
        else { order = SORT_ORDER.DESCENDING }
    }
    const limit = req.body.search_value ? req.body.search_value : 6
    conditions = sort_type ? { [`${sort_type}`]: order } : {}
    if (!userid) {
        results = await Search.find({
            $and: [
                { ['access.public']: true },
                { ['access.owner_id']: { $in: id_list } }
            ]
        }).sort(conditions).skip(skip).limit(limit)
    }
    else {
        results = await Search.find({
            $and: [
                {
                    $or: [
                        { ['access.public']: true },
                        { ['access.owner_id']: userid },
                        { ['access.editor_ids']: userid },
                        { ['access.viewer_ids']: userid }
                    ]
                },
                { ['access.owner_id']: { $in: id_list } }
            ]
        }).sort(conditions).skip(skip).limit(limit)
    }
    if (!results) {
        return res.status(404).json({
            success: false,
            message: "Nothing Found"
        })
    }
    const mapped = results.map(x => ({
        _id: x._id,
        name: x.name,
        access: x.access,
        community: x.community,
        lastEdited: x.lastEdited,
        type: req.params.type
    }))
    return res.status(200).json({
        success: true,
        type: req.params.type,
        list: mapped
    })
}
const searchUserByEmail = async (req, res) => {
    const target_email = req.body.email
    const found = await User.find({ email: target_email })
    const user = found[0]
    if (!user) {
        return res.status(201).json({ success: false })
    }
    const userInfo = { _id: user._id, username: user.username, email: user.email }
    return res.status(200).json({
        success: true,
        user: userInfo,
        target: target_email
    })
}

//Helper Functions---------------------------------------------------------------------
const createAccessConditions = (searcher_id, access) => {
    if (!searcher_id) {
        return [{ ['access.public']: true }]
    }
    let conditions = []
    let or_part = []
    if (access <= ACCESS_TYPE.OWNER) {
        or_part.push({ ['access.owner_id']: searcher_id })
    }
    if (access <= ACCESS_TYPE.EDITABLE) {
        or_part.push({ ['access.editor_ids']: searcher_id })
    }
    if (access <= ACCESS_TYPE.VIEWABLE) {
        or_part.push({ ['access.public']: true })
        or_part.push({ ['access.viewer_ids']: searcher_id })
    }
    conditions.push({ $or: or_part })
    if (access == ACCESS_TYPE.FAVORITE) {
        conditions.push({ ['community.favorited_Users']: searcher_id })
    }
    return conditions
}

const createSearchConditions = async (search_type, search_value, exact) => {
    if (!search_value) { return [] }//becomes getAllAccessables
    if (search_type == SEARCH_TYPE.NAME) { return [{ name: { "$regex": search_value, "$options": "i" } }] }
    //search by creater
    const conditions = (exact) ? { username: search_value } : { username: { "$regex": search_value, "$options": "i" } }
    const matching_users = await User.find({ username: { "$regex": search_value, "$options": "i" } })
    const id_list = matching_users.map(x => x._id)
    return [{ ['access.owner_id']: { $in: id_list } }]
}

const createSortConditions = (sort_type, sort_order) => {
    return [[`${sort_type}`, sort_order], ["_id", -1]]
}

//{name:{ "$regex": search_value, "$options": "i" }}

//Helper function ends-----------------------------------------------------------------


//This is made to be the universal search function
const searchProjects2 = async (req, res) => {
    if (!req.params.type) {
        return res
            .status(400)
            .json({ errorMessage: "Type of Project needed" });
    }
    const Search = (req.params.type == PROJECT_TYPE.TILEMAP) ? TileMap : TileSet;
    //setting default values
    const searcher_id = (req.body.searcher_id) ? req.body.searcher_id : ''
    const access = (req.body.access) ? req.body.access : ACCESS_TYPE.VIEWABLE

    const search_type = (req.body.search_type) ? req.body.search_type : SEARCH_TYPE.NAME
    const search_value = (req.body.search_value) ? req.body.search_value : ''

    const sort_type = (req.body.sort_type) ? req.body.sort_type : SORT_TYPE.RECENT
    const sort_order = (req.body.sort_order) ? req.body.sort_order : ((sort_type == SORT_TYPE.NAME || sort_type == SORT_TYPE.RECENT) ? SORT_ORDER.ASCENDING : SORT_ORDER.DESCENDING)
    const skip = (req.body.skip) ? req.body.skip : 0
    const limit = (req.body.limit) ? req.body.limit : 0

    //generating the main conditions
    const access_conditions = createAccessConditions(searcher_id, access)
    const search_conditions = await createSearchConditions(search_type, search_value, req.body.exact)
    const sort_conditions = createSortConditions(sort_type, sort_order)
    //Finding the values
    const find_conditions = access_conditions.concat(search_conditions)
    const results = await Search.find({ $and: find_conditions }).sort(sort_conditions).skip(skip).limit(limit).exec()
    const id_list = results.map(x => x.access.owner_id)
    const matching_users = await User.find({ _id: { $in: id_list } })

    const mapped = results.map(x => ({
        _id: x._id,
        name: x.name,
        access: x.access,
        community: x.community,
        lastEdited: x.lastEdited,
        type: req.params.type,
        src: (x.url) ? x.url : "",
        width: x.width,
        height: x.height,
        pixel: (x.pixel)?x.pixel: -1
    }))

    const usernames = matching_users.map(x => ({ _id: x._id, username: x.username }))
    return res.status(200).json({
        success: true,
        type: req.params.type,
        results: mapped,
        users: usernames
    })
}

const getWhatsNew = async (req, res) => {
    const searcher_id = req.params.id
    const find_conditions_alert = (searcher_id == 'guest') ? {} : { alert_user_id: searcher_id }
    //const find_conditions = (searcher_id == guest)?{}:{['access.owner_id']: searcher_id}
    const comments_list = await Comment.find(find_conditions_alert).sort([['dateCreated', SORT_ORDER.ASCENDING], ["_id", -1]]).limit(10)//returning
    const project_ids = comments_list.map(x => x.project_id)

    const tilemaps = await TileMap.find({ _id: { $in: project_ids } })
    const tilesets = await TileSet.find({ _id: { $in: project_ids } })

    const mapped_tm = tilemaps.map(x => ({
        _id: x._id,
        name: x.name,
        access: x.access,
        community: x.community,
        lastEdited: x.lastEdited,
        type: PROJECT_TYPE.TILEMAP
    }))
    const mapped_ts = tilesets.map(x => ({
        _id: x._id,
        name: x.name,
        access: x.access,
        community: x.community,
        lastEdited: x.lastEdited,
        type: PROJECT_TYPE.TILESET
    }))
    const projects = [...mapped_tm, ...mapped_ts]//returning
    const comment_owner_ids = comments_list.map(x => x.user_id)
    const project_owner_ids = projects.map(x => x.access.owner_id)
    const all_owner_ids = [...comment_owner_ids, ...project_owner_ids]

    const all_users = await User.find({ _id: { $in: all_owner_ids } })
    const usernames = all_users.map(x => ({ _id: x._id, username: x.username }))//returning

    return res.status(200).json({
        success: true,
        comments: comments_list,
        projects: projects,
        users: usernames
    })
}

module.exports = {
    // getUsernameByIds,
    // getViewableProjects,
    // getEditableProjects,
    // getFavoriteProjects,
    // searchProject,
    // searchUsers,
    // searchProjectByUsers,
    searchProjects2,
    getWhatsNew,
    searchUserByEmail
}


