const TileMap = require('../models/tilemap-model')
const TileSet = require('../models/tileset-model')
const User = require('../models/user-model')

getUsernameByIds = async (req, res) => {
    const user_ids = req.body.user_ids
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
    const Search = (req.params.type === "tilemap")?TileMap:TileSet;
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
        ]})
    }
    if(!results){
        return res.status(404).json({
            success: false,
            message: "Nothing Found"
        })
    }
    return res.status(200).json({
        success: true,
        type: req.params.type,
        list: results
    })
}

searchProject = async (req, res) =>{
    const Search = (req.params.type === "tilemap")?TileMap:TileSet;
    const userid = req.body.searcher_id
    const sort_by = req.body.sort_by
    const order = req.body.order?req.body.order:-1
    const search_value = req.body.search_value?req.body.search_value:''
    const limit = req.body.search_value?req.body.search_value:6
    conditions = sort_by?{[`${sort_by}`]: order}:{}
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
    return res.status(200).json({
        success: true,
        type: req.params.type,
        list: results
    })
}

searchUsers = async(req, res) => {
    const search_value = req.body.search_value?req.body.search_value:''
    const limit = req.body.search_value?req.body.search_value:6
    results = await User.find( 
        {username:{ "$regex": search_value, "$options": "i" }}
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
    const id_list = req.body.id_list
    const Search = (req.params.type === "tilemap")?TileMap:TileSet;
    const userid = req.body.searcher_id
    const sort_by = req.body.sort_by
    const order = req.body.order?req.body.order:-1
    const limit = req.body.search_value?req.body.search_value:6
    conditions = sort_by?{[`${sort_by}`]: order}:{}
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
    return res.status(200).json({
        success: true,
        type: req.params.type,
        list: results
    })

}

module.export = {
    getUsernameByIds,
    getViewableProjects,
    searchProject,
    searchUsers,
    searchProjectByUsers
}


