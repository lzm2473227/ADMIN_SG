import request from '@/utils/request'

// 新增
export async function resource_Create(data) {
    return await request({
        url: '/org-server/Resource/create',
        method: 'post',
        data
    })
}

// 删除
export async function resource_batchDelete(data) {
    return await request({
        url: '/org-server/Resource/batchDelete',
        method: 'post',
        data
    })
}

export async function resource_loadAllResourceTree(data) {
    return await request({
        url: '/org-server/Resource/loadAllResourceTree',
        method: 'post',
        data
    })
}