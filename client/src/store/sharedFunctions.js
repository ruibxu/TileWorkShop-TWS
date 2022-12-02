import { SHARE_ROLE } from "../translator-client/sort-options"

const assignRoles = (list, role) => {
    return list.map(x => ({...x, access:role}))
}

export const createAccessList = (access, userList) => {
    const {owner_id, editor_ids, viewer_ids} = access
    console.log(userList)
    const owner = [userList.find(y => y._id == owner_id)].filter(x => x != null)
    const editors = editor_ids.map(x => userList.find(y => y._id == x)).filter(x => x != null)
    const viewers = viewer_ids.map(x => userList.find(y => y._id == x)).filter(x => x != null)

    const owner_ = assignRoles(owner, SHARE_ROLE.OWNER)
    const editors_ = assignRoles(editors, SHARE_ROLE.EDITOR)
    const viewers_ = assignRoles(viewers, SHARE_ROLE.VIEWER)

    const fullList = [...owner_, ...editors_, ...viewers_]
    return fullList
}