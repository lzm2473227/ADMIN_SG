import request from '@/utils/request'
// 未办件列表
// 已办件列表
export async function done(data) {
    return await request({
        url: '/oa-server/Document/documentList',
        method: 'post',
        data
    })
}

//未办件新增公文
//未办件编辑公文
export async function addFile(data) {
    return await request({
        url: '/oa-server/Document/createNewDocument',
        method: 'post',
        data
    })
}

//未办件公文详情
//已办件公文详情
export async function editFile(data) {
    return await request({
        url: `/oa-server/Document/documentDetail`,
        method: 'post',
        data
    })
}

//转已办件
export async function processed(data) {
    return await request({
        url: `/oa-server/Document/handleDocument`,
        method: 'post',
        data
    })
}

//转发公文
export async function forwardMail(data) {
    return await request({
        url: `/oa-server/Document/forwardDocument`,
        method: 'post',
        data
    })
}

//处理意见
export async function dispose(data) {
    return await request({
        url: `/oa-server/Document/receiverTS`,
        method: 'post',
        data
    })
}

//查看状态
export async function getState(data) {
    return await request({
        url: `/oa-server/Document/runningTabList`,
        method: 'post',
        data
    })
}

//撤销公文
export async function getCancel(data) {
    return await request({
        url: `/oa-server/Document/撤回公文`,
        method: 'post',
        data
    })
}

//获取当前部门所有人员
export async function getClerk(data) {
    return await request({
        url: `/org-server/Identity/queryIdentityDtoList`,
        method: 'post',
        data
    })
}

//预览公文
export async function preNewDocument(data) {
    return await request({
        url: `/oa-server/Document/preNewDocument`,
        method: 'post',
        data
    })
}

//上传附件
export async function uploadAttachments(data) {
    return await request({
        url: `/oa-server/Document/uploadAttachments`,
        method: 'post',
        data
    })
}

//删除附件
export async function delAttachment(data) {
    return await request({
        url: `/oa-server/Document/deleteAttachment`,
        method: 'post',
        data
    })
}
//删除公文
export async function deleteDocument(data) {
    return await request({
        url: `/oa-server/Document/deleteDocument`,
        method: 'post',
        data
    })
}

//上传附件列表
export async function attachmentsList(data) {
    return await request({
        url: `/oa-server/Document/attachmentsList`,
        method: 'post',
        data
    })
}

//新建模板
export async function createTemplate(data) {
    return await request({
        url: `/oa-server/Template/createTemplate`,
        method: 'post',
        data
    })
}

//模板列表   查询列表
export async function templateList(data) {
    return await request({
        url: `/oa-server/Template/selectListTemplate`,
        method: 'post',
        data
    })
}

//删除模板
export async function delTemplate(data) {
    return await request({
        url: `/oa-server/Template/deleteTemplate`,
        method: 'post',
        data
    })
}

// 未审核/已审核列表
export async function handleDocumentList(data) {
    return await request({
        url: `/oa-server/unreviewed/HandleDocumentList`,
        method: 'post',
        data
    })
}

// 转平台审核
export async function submitForAudit(data) {
    return await request({
        url: `/oa-server/Audit/submitForAudit`,
        method: 'post',
        data
    })
}

// 撤回审批件
export async function recallDocument(data) {
    return await request({
        url: `/oa-server/Document/recallDocument`,
        method: 'post',
        data
    })
}