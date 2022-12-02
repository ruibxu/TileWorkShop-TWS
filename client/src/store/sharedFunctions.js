import { SHARE_ROLE } from "../translator-client/sort-options"

const assignRoles = (list, role) => {
    return list.map(x => ({_id: x._id, username: x.username, email: x.email, access:role}))
}

export const createAccessList = (access, userList) => {
    const {owner_id, editor_ids, viewer_ids} = access
    const owner = [userList.find(y => y._id == owner_id)]
    const editors = editor_ids.map(x => userList.find(y => y._id == x))
    const viewers = viewer_ids.map(x => userList.find(y => y._id == x))

    const owner_ = assignRoles(owner, SHARE_ROLE.OWNER)
    const editors_ = assignRoles(editors, SHARE_ROLE.EDITOR)
    const viewers_ = assignRoles(viewers, SHARE_ROLE.VIEWER)

    const fullList = [...owner_, ...editors_, ...viewers_]
    console.log(fullList)
    return fullList
}