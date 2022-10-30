const TileMap = require('../models/tilemap-model')
const TileSet = require('../models/tileset-model')
const User = require('../models/user-model')
import { SORT_TYPE, SORT_ORDER, SEARCH_TYPE } from '../../translator/sort-options'

/*
NOTE TO TESTER:
commonly used veriable types (if applicable)
REQUIRED "params.type": get values from translantor/sort-options SEARCH_TYPE
REQUIRED "body.sort_type": get values from translantor/sort-options SORT_TYPE

OPTIONAL "body.searcher_id": fill if user is logged in
OPTIONAL "body.order": get values from translantor/sort-options SORT_ORDER
OPTIONAL "body.search_value": whatever they type in the search bar
OPTIONAL "body.limit": the number of items you want back Defaults to 6
*/

getUsernameByIds = async (req, res) => {
    const user_ids = req.body.user_ids //REQUIRED a list of userids to get the names of
    if (!user_ids){
        return res.status(200).json({mappings: []})
    }
    const users = await User.find({ '_id': { $in: user_ids } })
    const mapping = users.map((x)=>({
        _id: x._id,
        username: x.username
    }));
    return res.status(200).json({mappings: mapping})
}

getViewableProjects = async (req, res) =>{
    //optional {searcher_id: provide if logged in}
    const Search = (req.params.type == SEARCH_TYPE.TILEMAP)?TileMap:TileSet;
    const userid = req.body.searcher_id;
    if(!userid){
        results = await Search.find({['access.public']: true})
    }
    else{
        results = await Search.find({$or:[
            {['access.public']: true},
            {['access.owner_id']: userid},
            {['access.editor_ids']: userid},
            {['access.viewer_ids']: userid}
        ]}).sort({[`${SORT_TYPE.RECENT}`]:SORT_ORDER.DESCENDING})
    }
    if(!results){
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
        lastEdited: x.lastEdited
    }))
    return res.status(200).json({
        success: true,
        type: req.params.type,
        list: mapped
    })
}

getEditableProjects = async (req, res) =>{
    //REQUIRED {searcher_id: need to be logged in}
    const Search = (req.params.type == SEARCH_TYPE.TILEMAP)?TileMap:TileSet;
    const userid = req.body.searcher_id;
    if(!userid){
        return res.status(400).json({
            success: false,
            message: "Authentication error"
        })
    }
    else{
        results = await Search.find({$or:[
            {['access.owner_id']: userid},
            {['access.editor_ids']: userid},
        ]}).sort({[`${SORT_TYPE.RECENT}`]:SORT_ORDER.DESCENDING})
    }
    if(!results){
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
        lastEdited: x.lastEdited
    }))
    return res.status(200).json({
        success: true,
        type: req.params.type,
        list: mapped
    })
}

getFavoriteProjects = async (req, res) =>{
    //required: {searcher_id:}
    const Search = (req.params.type == SEARCH_TYPE.TILEMAP)?TileMap:TileSet;
    const userid = req.body.searcher_id
    if(!userid){
        return res.status(400).json({
            success: false,
            message: "Authentication error"
        })
    }
    else{
        results = await Search.find({$and:[
            {$or:[
                {['access.public']: true},
                {['access.owner_id']: userid},
                {['access.editor_ids']: userid},
                {['access.viewer_ids']: userid}
            ]},
            {['community.favorited_Users']: userid}
            ]}).sort({[`${SORT_TYPE.RECENT}`]:SORT_ORDER.DESCENDING})
    }
    if(!results){
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
        lastEdited: x.lastEdited
    }))
    return res.status(200).json({
        success: true,
        type: req.params.type,
        list: mapped
    })
}

searchProject = async (req, res) =>{
    //required: {searcher_id:}
    const Search = (req.params.type == SEARCH_TYPE.TILEMAP)?TileMap:TileSet;
    const userid = req.body.searcher_id
    const sort_type = req.body.sort_type
    const order = req.body.order
    if (!order){
        if(sort_type == SORT_TYPE.NAME){order = SORT_ORDER.ASCENDING}
        else{order = SORT_ORDER.DESCENDING}
    }
    const search_value = req.body.search_value?req.body.search_value:''
    const limit = req.body.search_value?req.body.search_value:6
    conditions = sort_type?{[`${sort_type}`]: order}:{}
    if(!userid){
        results = await Search.find({$and:[
            {['access.public']: true}, 
            {name:{ "$regex": search_value, "$options": "i" }}
        ]}).sort(conditions).limit(limit)
    }
    else{
        results = await Search.find({$and:[
            {$or:[
                {['access.public']: true},
                {['access.owner_id']: userid},
                {['access.editor_ids']: userid},
                {['access.viewer_ids']: userid}
            ]},
            {name:{ "$regex": search_value, "$options": "i" }}
            ]}).sort(conditions).limit(limit)
    }
    if(!results){
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
        lastEdited: x.lastEdited
    }))
    return res.status(200).json({
        success: true,
        type: req.params.type,
        list: mapped
    })
}

searchUsers = async(req, res) => {
    //REQUIRED req.body.exact: boolean
    const search_value = req.body.search_value?req.body.search_value:''
    const limit = req.body.search_value?req.body.search_value:6
    conditions = (req.body.exact)?{username: search_value}:{username:{ "$regex": search_value, "$options": "i" }}
    results = await User.find( 
        conditions
    ).sort({username: -1}).limit(limit)
    if(!results){
        return res.status(404).json({
            success: false,
            message: "Nothing Found"
        })
    }
    const map = results.map((x)=>({
        _id: x._id,
        username: x.username
    }))
    return res.status(200).json({
        success: true,
        list: map
    })
}

searchProjectByUsers = async(req, res) => {
    //REQUIRED req.body.id_list list of user_ids
    const id_list = req.body.id_list
    const Search = (req.params.type == SEARCH_TYPE.TILEMAP)?TileMap:TileSet;
    const userid = req.body.searcher_id
    const sort_type = req.body.sort_type
    const order = req.body.order
    if (!order){
        if(sort_type == SORT_TYPE.NAME){order = SORT_ORDER.ASCENDING}
        else{order = SORT_ORDER.DESCENDING}
    }
    const limit = req.body.search_value?req.body.search_value:6
    conditions = sort_type?{[`${sort_type}`]: order}:{}
    if(!userid){
        results = await Search.find({$and:[
            {['access.public']: true}, 
            {['access.owner_id']:{ $in: id_list}}
        ]}).sort(conditions).limit(limit)
    }
    else{
        results = await Search.find({$and:[
            {$or:[
                {['access.public']: true},
                {['access.owner_id']: userid},
                {['access.editor_ids']: userid},
                {['access.viewer_ids']: userid}
            ]},
            {['access.owner_id']:{ $in: id_list}}
            ]}).sort(conditions).limit(limit)
    }
    if(!results){
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
        lastEdited: x.lastEdited
    }))
    return res.status(200).json({
        success: true,
        type: req.params.type,
        list: mapped
    })
}

module.export = {
    getUsernameByIds,
    getViewableProjects,
    getEditableProjects,
    getFavoriteProjects,
    searchProject,
    searchUsers,
    searchProjectByUsers
}


