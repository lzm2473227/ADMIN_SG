import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/',
        redirect: '/internalManage/companyInfo/unreleased',
    },

    // {
    //     path: '/',
    //     component: Layout,
    //     redirect: '/noorder',
    //     meta: { title: '订单管理' }, //icon:'dashboard'
    //     children: [{
    //             path: 'noorder',
    //             name: 'Noorder',
    //             component: () =>
    //                 import ('@/views/dashboard/noorder/index'),
    //             meta: { title: '未下单' },
    //         },
    //         {
    //             path: 'orderInfo',
    //             component: () =>
    //                 import ('@/views/dashboard/orderInfo'),
    //             name: 'OrderInfo',
    //             meta: { title: '商品订单', noCache: true, activeMenu: '/noorder' },
    //             hidden: true
    //         },
    //         {
    //             path: 'order',
    //             component: () =>
    //                 import ('@/views/dashboard/order/index'),
    //             name: 'Order',
    //             meta: { title: '已下单' }
    //         },
    //         // {
    //         //     path: 'order1',
    //         //     component: () =>
    //         //         import ('@/views/dashboard/order1'),
    //         //     name: 'Order1',
    //         //     meta: { title: '下单',noCache: true, activeMenu: '/noorder' },
    //         //     hidden: true
    //         // },
    //     ]
    // },

    // {
    //     path: '/agreementManage',
    //     component: Layout,
    //     redirect: '/agreementManage',
    //     name: 'AgreementManage',
    //     meta: { title: '合同管理' },
    //     children: [
    //         // {
    //         //     path: 'table',
    //         //     name: 'Table',
    //         //     component: () =>
    //         //         import ('@/views/table/index'),
    //         //     meta: { title: '未报价格' }
    //         // },
    //         // {
    //         //     path: 'table1',
    //         //     name: 'Table1',
    //         //     component: () =>
    //         //         import ('@/views/table/table1/index'),
    //         //     meta: { title: '已报价格' }
    //         // },
    //         {
    //             path: 'unreceipted',
    //             name: 'Unreceipted',
    //             component: () =>
    //                 import ('@/views/agreementManage/unreceipted/index'),
    //             meta: { title: '未签订合同' }
    //         },
    //         {
    //             path: 'agreementForm',
    //             component: () =>
    //                 import ('@/views/agreementManage/agreementForm'),
    //             name: 'AgreementForm',
    //             meta: { title: '合同单', noCache: true, activeMenu: '/agreementManage/unreceipted' },
    //             hidden: true
    //         },
    //         {
    //             path: 'receipt',
    //             name: 'Receipt',
    //             component: () =>
    //                 import ('@/views/agreementManage/receipt/index'),
    //             meta: { title: '已签订合同' }
    //         },
    //     ]
    // },
    // // 支付
    // {
    //     path: '/pays',
    //     component: Layout,
    //     redirect: '/pay/nopay',
    //     name: 'Pays',
    //     meta: { title: '支付管理' },
    //     children: [{
    //             path: 'nopay',
    //             name: 'Nopay',
    //             component: () =>
    //                 import ('@/views/pays/nopay/index'),
    //             meta: { title: '未收款' }
    //         },
    //         {
    //             path: 'pay',
    //             name: 'Pay',
    //             component: () =>
    //                 import ('@/views/pays/pay/index'),
    //             meta: { title: '已收款' }
    //         },
    //         {
    //             path: 'invoice',
    //             name: 'Invoice',
    //             component: () =>
    //                 import ('@/views/pays/invoice/index'),
    //             meta: { title: '未开票' }
    //         },
    //         {
    //             path: 'noinvoice',
    //             name: 'Noinvoice',
    //             component: () =>
    //                 import ('@/views/pays/noinvoice/index'),
    //             meta: { title: '已开票' }
    //         },
    //     ]
    // },
    // {
    //     path: '/tree',
    //     component: Layout,
    //     name: 'Tree',
    //     meta: { title: '提货管理' },
    //     children: [{
    //             path: 'tree1',
    //             name: 'Tree1',
    //             component: () =>
    //                 import ('@/views/tree/tree1'),
    //             meta: { title: '待确定提货单' }
    //         },
    //         {
    //             path: 'tree2',
    //             name: 'Tree2',
    //             component: () =>
    //                 import ('@/views/tree/tree2'),
    //             meta: { title: '已确定提货单' }
    //         },
    //     ]
    // },

    // {
    //     path: '/inventory',
    //     component: Layout,
    //     meta: { title: '库存管理' },
    //     children: [{
    //             path: 'inventorylist',
    //             name: 'Inventorylist',
    //             component: () =>
    //                 import ('@/views/inventory/inventorylist/index'),
    //             meta: { title: '库存列表' }
    //         },
    //         {
    //             path: 'inventoryenter',
    //             name: 'Inventoryenter',
    //             component: () =>
    //                 import ('@/views/inventory/inventory-enter'),
    //             redirect: '/inventory/inventoryenter/noinventoryenter',
    //             meta: { title: '线上入库' },
    //             children: [{
    //                     path: 'noinventoryenter',
    //                     component: () =>
    //                         import ('@/views/inventory/inventory-enter/noinventory/index'),
    //                     name: 'Noinventoryenter',
    //                     meta: { title: '未入库' }
    //                 },
    //                 {
    //                     path: 'inventoryenter',
    //                     component: () =>
    //                         import ('@/views/inventory/inventory-enter/inventory/index'),
    //                     name: 'Inventoryenter',
    //                     meta: { title: '已入库' }
    //                 }
    //             ]
    //         },
    //         {
    //             path: 'inventoryout',
    //             name: 'Inventoryouts',
    //             component: () =>
    //                 import ('@/views/inventory/inventory-out/index.vue'),
    //             meta: { title: '线上出库' },
    //             children: [{
    //                     path: 'noinventoryout',
    //                     component: () =>
    //                         import ('@/views/inventory/inventory-out/noinventory'),
    //                     name: 'Noinventoryouts',
    //                     meta: { title: '未出库' }
    //                 },
    //                 {
    //                     path: 'inventoryout',
    //                     component: () =>
    //                         import ('@/views/inventory/inventory-out/inventory'),
    //                     name: 'Inventoryouts',
    //                     meta: { title: '已出库' }
    //                 }
    //             ]
    //         },
    //     ]
    // },
    // // 物流配送
    // {
    //     path: '/logistics',
    //     component: Layout,
    //     name: 'Logistics',
    //     meta: { title: '物流配送' },
    //     children: [{
    //             path: 'logistics1',
    //             name: 'Logistics1',
    //             component: () =>
    //                 import ('@/views/logistics/logistics1/index'),
    //             meta: { title: '未配送' }
    //         },
    //         {
    //             path: 'logistics2',
    //             name: 'Logistics2',
    //             component: () =>
    //                 import ('@/views/logistics/logistics2/index'),
    //             meta: { title: '已配送' }
    //         },
    //     ]
    // },



    // {
    //     path: '/offline',
    //     component: Layout,
    //     redirect: '/offline/cargo',
    //     name: 'Offline',
    //     meta: { title: '线下业务' },
    //     children: [{
    //             path: 'cargo',
    //             component: () =>
    //                 import ('@/views/offline/cargo'), // Parent router-view
    //             name: 'Cargo',
    //             meta: { title: '收货' },
    //             children: [{
    //                     path: 'cargo',
    //                     component: () =>
    //                         import ('@/views/offline/cargo/cargo'),
    //                     name: 'Cargo',
    //                     meta: { title: '待收货' }
    //                 },
    //                 {
    //                     path: 'nocargo',
    //                     component: () =>
    //                         import ('@/views/offline/cargo/nocargo'),
    //                     name: 'Nocargo',
    //                     meta: { title: '已收货' }
    //                 }
    //             ]
    //         },
    //         {
    //             path: 'examine',
    //             component: () =>
    //                 import ('@/views/offline/examine'), // Parent router-view
    //             name: 'Examine',
    //             meta: { title: '盘货' },
    //             children: [{
    //                     path: 'examine',
    //                     component: () =>
    //                         import ('@/views/offline/examine/examine'),
    //                     name: 'Examine',
    //                     meta: { title: '待盘货' }
    //                 },
    //                 {
    //                     path: 'noexamine',
    //                     component: () =>
    //                         import ('@/views/offline/examine/noexamine'),
    //                     name: 'Noexamine',
    //                     meta: { title: '已盘货' }
    //                 }
    //             ]
    //         },
    //         {
    //             path: 'sell',
    //             component: () =>
    //                 import ('@/views/offline/sell'), // Parent router-view
    //             name: 'Sell',
    //             meta: { title: '售货' },
    //             children: [{
    //                     path: 'sell',
    //                     component: () =>
    //                         import ('@/views/offline/sell/sell'),
    //                     name: 'Sell',
    //                     meta: { title: '待售出' }
    //                 },
    //                 {
    //                     path: 'nosell',
    //                     component: () =>
    //                         import ('@/views/offline/sell/nosell'),
    //                     name: 'Nosell',
    //                     meta: { title: '已售出' }
    //                 }
    //             ]
    //         },
    //     ]
    // },

    // {
    //   path: 'external-link',
    //   component: Layout,
    //   children: [
    //     {path: 'https://panjiachen.github.io/vue-element-admin-site/#/',}
    //   ]
    // },
    // { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
    //生产管理
    {
        path: '/produce',
        component: Layout,
        meta: { title: '生产', roles: ['produce'] },
        children: [{
                path: 'codingScheme',
                name: 'CodingScheme',
                component: () =>
                    import ('@/views/produce/codingScheme/index'),
                meta: { title: '编码计划', roles: ['produce'] },
                children: [{
                        path: 'unreleased',
                        component: () =>
                            import ('@/views/produce/codingScheme/unreleased'),
                        name: 'UnreleaseCodingScheme',
                        meta: { title: '未审核编码计划' }
                    },
                    {
                        path: 'unreleaseCodingSchemeInfo',
                        component: () =>
                            import ('@/views/produce/codingScheme/unreleased/unreleaseCodingSchemeInfo'),
                        name: 'UnreleaseCodingSchemeInfo',
                        meta: { title: '未审核审编码计划详情', noCache: true, activeMenu: '/produce/codingScheme/unreleased' },
                        hidden: true
                    },
                    {
                        path: 'released',
                        component: () =>
                            import ('@/views/produce/codingScheme/released'),
                        name: 'ReleasedCodingScheme',
                        meta: { title: '已审核编码计划' }
                    },
                    {
                        path: 'releasedCodingSchemeInfo',
                        component: () =>
                            import ('@/views/produce/codingScheme/released/releasedCodingSchemeInfo'),
                        name: 'ReleasedCodingSchemeInfo',
                        meta: { title: '已审核编码计划详情', noCache: true, activeMenu: '/produce/codingScheme/released' },
                        hidden: true
                    },
                    {
                        path: 'codeList',
                        component: () =>
                            import ('@/views/produce/codingScheme/codeList'),
                        name: 'CodeList',
                        meta: { title: '编码计划列表' }
                    },
                    {
                        path: 'codeListDetail',
                        component: () =>
                            import ('@/views/produce/codingScheme/codeList/codeListDetail'),
                        name: 'CodeListDetail',
                        meta: { title: '编码明细', noCache: true, activeMenu: '/produce/codingScheme/codeList' },
                        hidden: true
                    },
                    {
                        path: 'codeListInfo',
                        component: () =>
                            import ('@/views/produce/codingScheme/codeList/codeListInfo'),
                        name: 'CodeListInfo',
                        meta: { title: '编码计划详情', noCache: true, activeMenu: '/produce/codingScheme/codeList' },
                        hidden: true
                    }
                ]
            },
            {
                path: 'receiveCode',
                component: () =>
                    import ('@/views/produce/receiveCode/index'),
                name: 'ReceiveCode',
                meta: { title: '接收编码', roles: ['produce'] },
                children: [{
                        path: 'toBereceivedCode',
                        component: () =>
                            import ('@/views/produce/receiveCode/toBereceivedCode'),
                        name: 'ToBereceivedCode',
                        meta: { title: '待接收编码', roles: ['produce'] }
                    },
                    {
                        path: 'toBereceivedCodeInfo',
                        component: () =>
                            import ('@/views/produce/receiveCode/toBereceivedCode/toBereceivedCodeInfo'),
                        name: 'ToBereceivedCodeInfo',
                        meta: { title: '待接收编码详情', noCache: true, activeMenu: '/produce/receiveCode/toBereceivedCode', roles: ['produce'] },
                        hidden: true
                    },
                    {
                        path: 'acceptedCode',
                        component: () =>
                            import ('@/views/produce/receiveCode/acceptedCode'),
                        name: 'AcceptedCode',
                        meta: { title: '已接收编码', roles: ['produce'] }
                    },
                    {
                        path: 'acceptedCodeInfo',
                        component: () =>
                            import ('@/views/produce/receiveCode/acceptedCode/acceptedCodeInfo'),
                        name: 'AcceptedCodeInfo',
                        meta: { title: '已接收编码详情', noCache: true, activeMenu: '/produce/receiveCode/acceptedCode', roles: ['produce'] },
                        hidden: true
                    }
                ]
            },
            {
                path: 'productInfo',
                component: () =>
                    import ('@/views/produce/productInfo/index'),
                name: 'ProductInfo',
                meta: { title: '产品信息', roles: ['produce'] },
                children: [{
                        path: 'commodityCategory',
                        component: () =>
                            import ('@/views/produce/productInfo/commodityCategory'),
                        name: 'CommodityCategory',
                        meta: { title: '商品类目', roles: ['produce'] }
                    },
                    {
                        path: 'brand',
                        component: () =>
                            import ('@/views/produce/productInfo/brand'),
                        name: 'Brand',
                        meta: { title: '产品品牌', roles: ['produce'] }
                    },
                    {
                        path: 'brandInfo',
                        component: () =>
                            import ('@/views/produce/productInfo/brand/brandInfo'),
                        name: 'BrandInfo',
                        meta: { title: '品牌信息表', noCache: true, activeMenu: '/produce/productInfo/brand', roles: ['produce'] },
                        hidden: true
                    },
                    {
                        path: 'productList',
                        component: () =>
                            import ('@/views/produce/productInfo/productList'),
                        name: 'ProductList',
                        meta: { title: '产品列表', roles: ['produce'] }
                    },
                    {
                        path: 'productListInfo',
                        component: () =>
                            import ('@/views/produce/productInfo/productList/productListInfo'),
                        name: 'ProductListInfo',
                        meta: { title: '产品信息表', noCache: true, activeMenu: '/produce/productInfo/productList', roles: ['produce'] },
                        hidden: true
                    }
                ]
            }
        ]
    },

    // 检测认证
    {
        path: '/check',
        component: Layout,
        meta: { title: '检测认证', roles: ['check'] },
        children: [{
            path: 'quality',
            name: 'Quality',
            component: () =>
                import ('@/views/check/quality/index'),
            meta: { title: '质量检测', roles: ['check'] },
            children: [{
                    path: 'unreleased',
                    component: () =>
                        import ('@/views/check/quality/unreleased'),
                    name: 'UnreleaseQuality',
                    meta: { title: '未审核检测信息', roles: ['check'] }
                },
                {
                    path: 'unreleaseQualityInfo',
                    component: () =>
                        import ('@/views/check/quality/unreleased/unreleaseQualityInfo'),
                    name: 'UnreleaseQualityInfo',
                    meta: { title: '未审核审检测信息详情', noCache: true, activeMenu: '/check/quality/unreleased', roles: ['check'] },
                    hidden: true
                },
                {
                    path: 'released',
                    component: () =>
                        import ('@/views/check/quality/released'),
                    name: 'ReleasedQuality',
                    meta: { title: '已审核检测信息', roles: ['check'] }
                },
                {
                    path: 'releasedQualityInfo',
                    component: () =>
                        import ('@/views/check/quality/released/releasedQualityInfo'),
                    name: 'ReleasedQualityInfo',
                    meta: { title: '已审核检测信息详情', noCache: true, activeMenu: '/check/quality/released', roles: ['check'] },
                    hidden: true
                },
                {
                    path: 'published',
                    component: () =>
                        import ('@/views/check/quality/published'),
                    name: 'Published',
                    meta: { title: '已发布检测信息', roles: ['check'] }
                },
                {
                    path: 'publishedQualityInfo',
                    component: () =>
                        import ('@/views/check/quality/published/publishedQualityInfo'),
                    name: 'PublishedQualityInfo',
                    meta: { title: '已发布检测信息详情', noCache: true, activeMenu: '/check/quality/published', roles: ['check'] },
                    hidden: true
                }
            ]
        }]
    },

    // 物流配送
    {
        path: '/logistics',
        component: Layout,
        meta: { title: '物流配送', roles: ['logistics'] },
        children: [{
                path: 'unreleased',
                component: () =>
                    import ('@/views/logistics/unreleased'),
                name: 'UnreleasedLogistics',
                meta: { title: '未审核物流' }
            },
            {
                path: 'unapprovedApproval',
                component: () =>
                    import ('@/views/logistics/unreleased/unapprovedApproval'),
                name: 'UnapprovedApproval',
                meta: { title: '未审核审批件', noCache: true, activeMenu: '/logistics/unreleased' },
                hidden: true
            },
            {
                path: 'unreleasedLogisticsInfo',
                component: () =>
                    import ('@/views/logistics/unreleased/unreleasedLogisticsInfo'),
                name: 'UnreleasedLogisticsInfo',
                meta: { title: '未审核物流信息表', noCache: true, activeMenu: '/logistics/unreleased' },
                hidden: true
            },
            {
                path: 'released',
                component: () =>
                    import ('@/views/logistics/released'),
                name: 'ReleasedLogistics',
                meta: { title: '已审核物流' }
            },
            {
                path: 'releasedLogisticsInfo',
                component: () =>
                    import ('@/views/logistics/released/releasedLogisticsInfo'),
                name: 'ReleasedLogisticsInfo',
                meta: { title: '已审核物流信息表', noCache: true, activeMenu: '/logistics/released' },
                hidden: true
            },
            {
                path: 'published',
                component: () =>
                    import ('@/views/logistics/published'),
                name: 'Published',
                meta: { title: '物流列表' }
            },
            {
                path: 'publishedLogisticsInfo',
                component: () =>
                    import ('@/views/logistics/published/publishedLogisticsInfo'),
                name: 'PublishedLogisticsInfo',
                meta: { title: '物流单详情', noCache: true, activeMenu: '/logistics/published' },
                hidden: true
            }
        ]
    },

    //库存管理
    {
        path: '/stock',
        component: Layout,
        meta: { title: '库管', roles: ['stock'] },
        children: [{
                path: 'stockList',
                component: () =>
                    import ('@/views/stock/stockList'),
                name: 'StockList',
                meta: { title: '仓库列表' }
            },
            {
                path: 'stockQuery',
                component: () =>
                    import ('@/views/stock/stockQuery'),
                name: 'StockQuery',
                meta: { title: '库存查询' }
            },
            {
                path: 'stockCodeList',
                component: () =>
                    import ('@/views/stock/stockCodeList'),
                name: 'StockCodeList',
                meta: { title: '总库存编码明细', noCache: true, activeMenu: '/stock/stockCodeList' },
                hidden: true
            },
            {
                path: 'passToStock',
                name: 'PassToStock',
                component: () =>
                    import ('@/views/stock/passToStock/index'),
                meta: { title: '入库' },
                children: [{
                        path: 'unreleased',
                        component: () =>
                            import ('@/views/stock/passToStock/unreleased'),
                        name: 'UnreleasedPassToStock',
                        meta: { title: '未审核入库' }
                    },
                    // {
                    //     path: 'unapprovedApproval',
                    //     component: () =>
                    //         import ('@/views/purchase/purchaseOrder/unreleased/unapprovedApproval'),
                    //     name: 'UnapprovedApproval',
                    //     meta: { title: '未审核审批件', noCache: true, activeMenu: '/purchase/purchaseOrder/unreleased' },
                    //     hidden: true
                    // },
                    // {
                    //     path: 'unreleasedOrderInfo',
                    //     component: () =>
                    //         import ('@/views/purchase/purchaseOrder/unreleased/unreleasedOrderInfo'),
                    //     name: 'UnreleasedOrderInfo',
                    //     meta: { title: '未审核订单信息表', noCache: true, activeMenu: '/purchase/purchaseOrder/unreleased' },
                    //     hidden: true
                    // },
                    // {
                    //     path: 'quoteDetail',
                    //     component: () =>
                    //         import ('@/views/purchase/purchaseOrder/unreleased/quoteDetail'),
                    //     name: 'QuoteDetail',
                    //     meta: { title: '报价订单信息表', noCache: true, activeMenu: '/purchase/purchaseOrder/unreleased' },
                    //     hidden: true
                    // },
                    {
                        path: 'released',
                        component: () =>
                            import ('@/views/stock/passToStock/released'),
                        name: 'ReleasedPassToStock',
                        meta: { title: '已审核入库' }
                    },
                    {
                        path: 'releasedPassToStockInfo',
                        component: () =>
                            import ('@/views/stock/passToStock/released/releasedPassToStockInfo'),
                        name: 'ReleasedPassToStockInfo',
                        meta: { title: '已审核入库单信息表', noCache: true, activeMenu: '/stock/passToStock/released' },
                        hidden: true
                    },
                    {
                        path: 'passToStockList',
                        component: () =>
                            import ('@/views/stock/passToStock/passToStockList'),
                        name: 'PassToStockList',
                        meta: { title: '入库单列表' }
                    },
                    {
                        path: 'passToStockInfo',
                        component: () =>
                            import ('@/views/stock/passToStock/passToStockList/passToStockInfo'),
                        name: 'PassToStockInfo',
                        meta: { title: '入库单详情', noCache: true, activeMenu: '/stock/passToStock/passToStockList' },
                        hidden: true
                    }
                ]
            },
            {
                path: 'retrieval',
                name: 'Retrieval',
                component: () =>
                    import ('@/views/stock/retrieval/index'),
                meta: { title: '出库' },
                children: [{
                        path: 'unreleased',
                        component: () =>
                            import ('@/views/stock/retrieval/unreleased'),
                        name: 'UnreleasedRetrieval',
                        meta: { title: '未审核出库' }
                    },
                    {
                        path: 'unreleasedList',
                        component: () =>
                            import ('@/views/stock/retrieval/unreleased/unreleasedList'),
                        name: 'UnreleasedList',
                        meta: { title: '未审核出库单审批件', noCache: true, activeMenu: '/stock/retrieval/unreleased' },
                        hidden: true
                    },
                    {
                        path: 'unreleasedRetrievalInfo',
                        component: () =>
                            import ('@/views/stock/retrieval/unreleased/unreleasedRetrievalInfo'),
                        name: 'UnreleasedRetrievalInfo',
                        meta: { title: '未审核出库单信息表', noCache: true, activeMenu: '/stock/retrieval/unreleased' },
                        hidden: true
                    },
                    {
                        path: 'orderDetail',
                        component: () =>
                            import ('@/views/stock/retrieval/unreleased/orderDetail'),
                        name: 'UnreleasedOrderDetail',
                        meta: { title: '订单详情', noCache: true, activeMenu: '/stock/retrieval/unreleased' },
                        hidden: true
                    },
                    // {
                    //     path: 'quoteDetail',
                    //     component: () =>
                    //         import ('@/views/purchase/purchaseOrder/unreleased/quoteDetail'),
                    //     name: 'QuoteDetail',
                    //     meta: { title: '报价订单信息表', noCache: true, activeMenu: '/purchase/purchaseOrder/unreleased' },
                    //     hidden: true
                    // },
                    {
                        path: 'released',
                        component: () =>
                            import ('@/views/stock/retrieval/released'),
                        name: 'ReleasedRetrieval',
                        meta: { title: '已审核出库' }
                    },
                    {
                        path: 'releasedRetrievalInfo',
                        component: () =>
                            import ('@/views/stock/retrieval/released/releasedRetrievalInfo'),
                        name: 'ReleasedRetrievalInfo',
                        meta: { title: '已审核出库单信息表', noCache: true, activeMenu: '/stock/retrieval/released' },
                        hidden: true
                    },
                    {
                        path: 'retrievalList',
                        component: () =>
                            import ('@/views/stock/retrieval/retrievalList'),
                        name: 'RetrievalList',
                        meta: { title: '出库单列表' }
                    },
                    {
                        path: 'retrievalInfo',
                        component: () =>
                            import ('@/views/stock/retrieval/retrievalList/retrievalInfo'),
                        name: 'RetrievalInfo',
                        meta: { title: '出库单详情', noCache: true, activeMenu: '/stock/retrieval/retrievalList' },
                        hidden: true
                    }
                ]
            }
        ]
    },

    //采购管理
    {
        path: '/purchase',
        component: Layout,
        meta: { title: '采购管理', roles: ['purchase'] },
        children: [{
            path: 'purchaseOrder',
            name: 'PurchaseOrder',
            component: () =>
                import ('@/views/purchase/purchaseOrder/index'),
            meta: { title: '采购订单' },
            children: [{
                    path: 'unreleased',
                    component: () =>
                        import ('@/views/purchase/purchaseOrder/unreleased'),
                    name: 'UnreleasedAdvertising',
                    meta: { title: '未审核订单' }
                },
                {
                    path: 'unapprovedApproval',
                    component: () =>
                        import ('@/views/purchase/purchaseOrder/unreleased/unapprovedApproval'),
                    name: 'UnapprovedApproval',
                    meta: { title: '未审核审批件', noCache: true, activeMenu: '/purchase/purchaseOrder/unreleased' },
                    hidden: true
                },
                {
                    path: 'unreleasedOrderInfo',
                    component: () =>
                        import ('@/views/purchase/purchaseOrder/unreleased/unreleasedOrderInfo'),
                    name: 'UnreleasedOrderInfo',
                    meta: { title: '未审核订单信息表', noCache: true, activeMenu: '/purchase/purchaseOrder/unreleased' },
                    hidden: true
                },
                {
                    path: 'quoteDetail',
                    component: () =>
                        import ('@/views/purchase/purchaseOrder/unreleased/quoteDetail'),
                    name: 'QuoteDetail',
                    meta: { title: '报价订单信息表', noCache: true, activeMenu: '/purchase/purchaseOrder/unreleased' },
                    hidden: true
                },
                {
                    path: 'released',
                    component: () =>
                        import ('@/views/purchase/purchaseOrder/released'),
                    name: 'ReleasedOrder',
                    meta: { title: '已审核订单' }
                },
                {
                    path: 'releasedOrderInfo',
                    component: () =>
                        import ('@/views/purchase/purchaseOrder/released/releasedOrderInfo'),
                    name: 'ReleasedOrderInfo',
                    meta: { title: '已审核订单信息表', noCache: true, activeMenu: '/purchase/purchaseOrder/released' },
                    hidden: true
                },
                {
                    path: 'published',
                    component: () =>
                        import ('@/views/purchase/purchaseOrder/published'),
                    name: 'Published',
                    meta: { title: '订单列表' }
                },
                {
                    path: 'publishedOrderInfo',
                    component: () =>
                        import ('@/views/purchase/purchaseOrder/published/publishedOrderInfo'),
                    name: 'PublishedOrderInfo',
                    meta: { title: '订单信息表', noCache: true, activeMenu: '/purchase/purchaseOrder/published' },
                    hidden: true
                }
            ]
        }]
    },

    //促销管理
    {
        path: '/promotion',
        component: Layout,
        meta: { title: '促销管理', roles: ['promotion'] },
        children: [{
                path: 'advertising',
                name: 'Advertising',
                component: () =>
                    import ('@/views/promotion/advertising/index'),
                meta: { title: '广告管理' },
                children: [{
                        path: 'unreleased',
                        component: () =>
                            import ('@/views/promotion/advertising/unreleased'),
                        name: 'UnreleasedAdvertising',
                        meta: { title: '未审核广告' }
                    },
                    {
                        path: 'unreleasedAdvertisingInfo',
                        component: () =>
                            import ('@/views/promotion/advertising/unreleased/unreleasedAdvertisingInfo'),
                        name: 'UnreleasedAdvertisingInfo',
                        meta: { title: '未审核广告信息表', noCache: true, activeMenu: '/promotion/advertising/unreleased' },
                        hidden: true
                    },
                    {
                        path: 'released',
                        component: () =>
                            import ('@/views/promotion/advertising/released'),
                        name: 'ReleasedAdvertising',
                        meta: { title: '已审核广告' }
                    },
                    {
                        path: 'releasedAdvertisingInfo',
                        component: () =>
                            import ('@/views/promotion/advertising/released/releasedAdvertisingInfo'),
                        name: 'ReleasedAdvertisingInfo',
                        meta: { title: '已审核广告信息表', noCache: true, activeMenu: '/promotion/advertising/released' },
                        hidden: true
                    },
                    {
                        path: 'published',
                        component: () =>
                            import ('@/views/promotion/advertising/published'),
                        name: 'Published',
                        meta: { title: '已发布广告' }
                    },
                    {
                        path: 'publishedAdvertisingInfo',
                        component: () =>
                            import ('@/views/promotion/advertising/published/publishedAdvertisingInfo'),
                        name: 'PublishedAdvertisingInfo',
                        meta: { title: '已发布广告信息表', noCache: true, activeMenu: '/promotion/advertising/published' },
                        hidden: true
                    }
                ]
            },
            {
                path: 'activity',
                name: 'Activity',
                component: () =>
                    import ('@/views/promotion/activity/index'),
                meta: { title: '活动管理' },
                children: [{
                        path: 'unreleased',
                        component: () =>
                            import ('@/views/promotion/activity/unreleased'),
                        name: 'UnreleasedActivity',
                        meta: { title: '未审核活动' }
                    },
                    {
                        path: 'unreleasedActivityInfo',
                        component: () =>
                            import ('@/views/promotion/activity/unreleased/unreleasedActivityInfo'),
                        name: 'UnreleasedActivityInfo',
                        meta: { title: '未审核活动信息表', noCache: true, activeMenu: '/promotion/activity/unreleased' },
                        hidden: true
                    },
                    {
                        path: 'released',
                        component: () =>
                            import ('@/views/promotion/activity/released'),
                        name: 'ReleasedActivity',
                        meta: { title: '已审核活动' }
                    },
                    {
                        path: 'releasedActivityInfo',
                        component: () =>
                            import ('@/views/promotion/activity/released/releasedActivityInfo'),
                        name: 'ReleasedActivityInfo',
                        meta: { title: '已审核活动信息表', noCache: true, activeMenu: '/promotion/activity/released' },
                        hidden: true
                    },
                    {
                        path: 'published',
                        component: () =>
                            import ('@/views/promotion/activity/published'),
                        name: 'Published',
                        meta: { title: '已发布活动' }
                    },
                    {
                        path: 'publishedActivityInfo',
                        component: () =>
                            import ('@/views/promotion/activity/published/publishedActivityInfo'),
                        name: 'PublishedActivityInfo',
                        meta: { title: '已发布活动信息表', noCache: true, activeMenu: '/promotion/activity/published' },
                        hidden: true
                    }
                ]
            }
        ]
    },

    {
        path: '/internalManage',
        component: Layout,
        redirect: '/internalManage/companyInfo/publishedCompany',
        name: 'InternalManage',
        meta: { title: '内部管理', roles: ['internalManage'] },
        children: [{
                path: 'companyInfo',
                component: () =>
                    import ('@/views/internalManage/companyInfo/index'), // Parent router-view
                name: 'CompanyInfo',
                meta: { title: '发布公司信息' },
                children: [{
                        path: 'unreleased',
                        component: () =>
                            import ('@/views/internalManage/companyInfo/unreleased'),
                        name: 'Unreleased',
                        meta: { title: '未审核公司信息' }
                    },
                    {
                        path: 'companyDetailInfo',
                        component: () =>
                            import ('@/views/internalManage/companyInfo/unreleased/companyDetailInfo'),
                        name: 'CompanyDetailInfo',
                        meta: { title: '未审核公司信息表', noCache: true, activeMenu: '/internalManage/companyInfo/unreleased' },
                        hidden: true
                    },
                    {
                        path: 'released',
                        component: () =>
                            import ('@/views/internalManage/companyInfo/released'),
                        name: 'Released',
                        meta: { title: '已审核公司信息' }
                    },
                    {
                        path: 'releasedCompanyDetailInfo',
                        component: () =>
                            import ('@/views/internalManage/companyInfo/released/releasedCompanyDetailInfo'),
                        name: 'ReleasedCompanyDetailInfo',
                        meta: { title: '已审核公司信息表', noCache: true, activeMenu: '/internalManage/companyInfo/released' },
                        hidden: true
                    },
                    {
                        path: 'publishedCompany',
                        component: () =>
                            import ('@/views/internalManage/companyInfo/publishedCompany'),
                        name: 'PublishedCompany',
                        meta: { title: '已发布公司信息' }
                    }
                ]
            },
            {
                path: 'storeInfo',
                component: () =>
                    import ('@/views/internalManage/storeInfo/index'),
                name: 'StoreInfo',
                meta: { title: '发布店铺信息' },
                children: [{
                        path: 'unreleased',
                        component: () =>
                            import ('@/views/internalManage/storeInfo/unreleased'),
                        name: 'Unreleased',
                        meta: { title: '未审核店铺信息' }
                    },
                    {
                        path: 'storeDetailInfo',
                        component: () =>
                            import ('@/views/internalManage/storeInfo/storeDetailInfo'),
                        name: 'StoreDetailInfo',
                        meta: { title: '未审核店铺信息表', noCache: true, activeMenu: '/internalManage/storeInfo/unreleased' },
                        hidden: true
                    },
                    {
                        path: 'released',
                        component: () =>
                            import ('@/views/internalManage/storeInfo/released'),
                        name: 'Released',
                        meta: { title: '已审核店铺信息' }
                    },
                    {
                        path: 'releasedStoreDetailInfo',
                        component: () =>
                            import ('@/views/internalManage/storeInfo/released/releasedStoreDetailInfo'),
                        name: 'ReleasedStoreDetailInfo',
                        meta: { title: '已审核店铺信息表', noCache: true, activeMenu: '/internalManage/storeInfo/released' },
                        hidden: true
                    },
                    {
                        path: 'published',
                        component: () =>
                            import ('@/views/internalManage/storeInfo/published'),
                        name: 'Published',
                        meta: { title: '已发布店铺列表' }
                    },
                    {
                        path: 'publishedStoreDetailInfo',
                        component: () =>
                            import ('@/views/internalManage/storeInfo/published/publishedStoreDetailInfo'),
                        name: 'PublishedStoreDetailInfo',
                        meta: { title: '已发布店铺信息表', noCache: true, activeMenu: '/internalManage/storeInfo/published' },
                        hidden: true
                    }
                ]
            },
            {
                path: 'commodityInfo',
                component: () =>
                    import ('@/views/internalManage/commodityInfo/index'),
                name: 'CommodityInfo',
                meta: { title: '发布商品信息' },
                children: [{
                        path: 'commodityCategory',
                        component: () =>
                            import ('@/views/internalManage/commodityInfo/commodityCategory'),
                        name: 'CommodityCategory',
                        meta: { title: '商品类目' }
                    },
                    {
                        path: 'unreleasedBrand',
                        component: () =>
                            import ('@/views/internalManage/commodityInfo/unreleasedBrand'),
                        name: 'UnreleasedBrand',
                        meta: { title: '未审核品牌' }
                    },
                    {
                        path: 'brandDetailInfo',
                        component: () =>
                            import ('@/views/internalManage/commodityInfo/brandDetailInfo'),
                        name: 'BrandDetailInfo',
                        meta: { title: '品牌信息表', noCache: true, activeMenu: '/internalManage/commodityInfo/unreleasedBrand' },
                        hidden: true
                    },
                    {
                        path: 'releasedBrand',
                        component: () =>
                            import ('@/views/internalManage/commodityInfo/releasedBrand'),
                        name: 'ReleasedBrand',
                        meta: { title: '已审核品牌' }
                    },
                    {
                        path: 'releasedBrandDetailInfo',
                        component: () =>
                            import ('@/views/internalManage/commodityInfo/releasedBrandDetailInfo'),
                        name: 'ReleasedBrandDetailInfo',
                        meta: { title: '已审核品牌信息表', noCache: true, activeMenu: '/internalManage/commodityInfo/releasedBrand' },
                        hidden: true
                    },
                    {
                        path: 'publishedBrand',
                        component: () =>
                            import ('@/views/internalManage/commodityInfo/publishedBrand'),
                        name: 'PublishedBrand',
                        meta: { title: '已发布品牌列表' }
                    },
                    {
                        path: 'publishedBrandDetailInfo',
                        component: () =>
                            import ('@/views/internalManage/commodityInfo/publishedBrandDetailInfo'),
                        name: 'PublishedBrandDetailInfo',
                        meta: { title: '已发布品牌信息表', noCache: true, activeMenu: '/internalManage/commodityInfo/publishedBrand' },
                        hidden: true
                    },
                    {
                        path: 'unreleased',
                        component: () =>
                            import ('@/views/internalManage/commodityInfo/unreleased'),
                        name: 'Unreleased',
                        meta: { title: '未审核商品' }
                    },
                    {
                        path: 'commodityDetailInfo',
                        component: () =>
                            import ('@/views/internalManage/commodityInfo/commodityDetailInfo'),
                        name: 'CommodityDetailInfo',
                        meta: { title: '商品信息表', noCache: true, activeMenu: '/internalManage/commodityInfo/unreleased' },
                        hidden: true
                    },
                    {
                        path: 'released',
                        component: () =>
                            import ('@/views/internalManage/commodityInfo/released'),
                        name: 'Released',
                        meta: { title: '已审核商品' }
                    },
                    {
                        path: 'releasedDetailInfo',
                        component: () =>
                            import ('@/views/internalManage/commodityInfo/releasedDetailInfo'),
                        name: 'ReleasedDetailInfo',
                        meta: { title: '已审核商品信息表', noCache: true, activeMenu: '/internalManage/commodityInfo/released' },
                        hidden: true
                    },
                    {
                        path: 'published',
                        component: () =>
                            import ('@/views/internalManage/commodityInfo/published'),
                        name: 'Published',
                        meta: { title: '已发布商品列表' }
                    },
                    {
                        path: 'publishedDetailInfo',
                        component: () =>
                            import ('@/views/internalManage/commodityInfo/publishedDetailInfo'),
                        name: 'PublishedDetailInfo',
                        meta: { title: '已发布商品信息表', noCache: true, activeMenu: '/internalManage/commodityInfo/published' },
                        hidden: true
                    },
                    {
                        path: 'unreleasedPrice',
                        component: () =>
                            import ('@/views/internalManage/commodityInfo/unreleasedPrice'),
                        name: 'UnreleasedPrice',
                        meta: { title: '未审核价格' }
                    },
                    {
                        path: 'releasedPrice',
                        component: () =>
                            import ('@/views/internalManage/commodityInfo/releasedPrice'),
                        name: 'ReleasedPrice',
                        meta: { title: '已审核价格' }
                    },
                    {
                        path: 'releasedPriceDetailInfo',
                        component: () =>
                            import ('@/views/internalManage/commodityInfo/releasedPrice/releasedPriceDetailInfo'),
                        name: 'ReleasedPriceDetailInfo',
                        meta: { title: '已审核价格信息表', noCache: true, activeMenu: '/internalManage/commodityInfo/releasedPrice' },
                        hidden: true
                    },
                    {
                        path: 'priceDetailInfo',
                        component: () =>
                            import ('@/views/internalManage/commodityInfo/priceDetailInfo'),
                        name: 'PriceDetailInfo',
                        meta: { title: '未审核价格信息表', noCache: true, activeMenu: '/internalManage/commodityInfo/unreleasedPrice' },
                        hidden: true
                    },
                    {
                        path: 'publishedPrice',
                        component: () =>
                            import ('@/views/internalManage/commodityInfo/publishedPrice'),
                        name: 'PublishedPrice',
                        meta: { title: '已发布价格' }
                    },
                    {
                        path: 'publishedPriceDetailInfo',
                        component: () =>
                            import ('@/views/internalManage/commodityInfo/publishedPrice/publishedPriceDetailInfo'),
                        name: 'PublishedPriceDetailInfo',
                        meta: { title: '已发布价格信息表', noCache: true, activeMenu: '/internalManage/commodityInfo/publishedPrice' },
                        hidden: true
                    },
                    // {
                    //     path: 'unreleasedPriceSingle',
                    //     component: () =>
                    //         import ('@/views/internalManage/commodityInfo/unreleasedPriceSingle'),
                    //     name: 'UnreleasedPriceSingle',
                    //     meta: { title: '未审核价格(单品)' }
                    // },
                    // {
                    //     path: 'releasedPriceSingle',
                    //     component: () =>
                    //         import ('@/views/internalManage/commodityInfo/releasedPriceSingle'),
                    //     name: 'ReleasedPriceSingle',
                    //     meta: { title: '已审核价格(单品)' }
                    // },
                    // {
                    //     path: 'priceDetailInfoSingle',
                    //     component: () =>
                    //         import ('@/views/internalManage/commodityInfo/priceDetailInfoSingle'),
                    //     name: 'PriceDetailInfoSingle',
                    //     meta: { title: '未审核价格信息表(单品)', noCache: true, activeMenu: '/internalManage/commodityInfo/unreleasedPriceSingle' },
                    //     hidden: true
                    // },
                    // {
                    //     path: 'releasedPriceSingleDetailInfo',
                    //     component: () =>
                    //         import ('@/views/internalManage/commodityInfo/releasedPriceSingle/releasedPriceSingleDetailInfo'),
                    //     name: 'ReleasedPriceSingleDetailInfo',
                    //     meta: { title: '已审核价格信息表(单品)', noCache: true, activeMenu: '/internalManage/commodityInfo/releasedPriceSingle' },
                    //     hidden: true
                    // },
                    // {
                    //     path: 'publishedPriceSingle',
                    //     component: () =>
                    //         import ('@/views/internalManage/commodityInfo/publishedPriceSingle'),
                    //     name: 'PublishedPriceSingle',
                    //     meta: { title: '已发布价格(单品)' }
                    // },
                    // {
                    //     path: 'publishedPriceSingleInfo',
                    //     component: () =>
                    //         import ('@/views/internalManage/commodityInfo/publishedPriceSingle/publishedPriceSingleInfo'),
                    //     name: 'PublishedPriceSingleInfo',
                    //     meta: { title: '已发布价格信息表(单品)', noCache: true, activeMenu: '/internalManage/commodityInfo/publishedPriceSingle' },
                    //     hidden: true
                    // }
                ]
            },
            {
                path: 'mateCommodity',
                component: () =>
                    import ('@/views/internalManage/mateCommodity/index'),
                name: 'MateCommodity',
                meta: { title: '匹配商品店铺' },
                children: [{
                        path: 'unreserved',
                        component: () =>
                            import ('@/views/internalManage/mateCommodity/unreserved'),
                        name: 'Unreserved',
                        meta: { title: '未定店铺' }
                    },
                    {
                        path: 'reserved',
                        component: () =>
                            import ('@/views/internalManage/mateCommodity/reserved'),
                        name: 'Reserved',
                        meta: { title: '已定店铺' }
                    },
                    {
                        path: 'onStore',
                        component: () =>
                            import ('@/views/internalManage/mateCommodity/reserved/onStore'),
                        name: 'OnStore',
                        meta: { title: '按店铺查看', noCache: true, activeMenu: '/internalManage/mateCommodity/reserved' },
                        hidden: true
                    }
                ]
            },
            {
                path: 'order',
                component: () =>
                    import ('@/views/internalManage/order/index'),
                name: 'MateCommodity',
                meta: { title: '销售订单' },
                children: [{
                        path: 'unreservedOrder',
                        component: () =>
                            import ('@/views/internalManage/order/unreservedOrder'),
                        name: 'UnreservedOrder',
                        meta: { title: '未审核订单' }
                    },
                    {
                        path: 'unreservedOrderInfo',
                        component: () =>
                            import ('@/views/internalManage/order/unreservedOrder/unreservedOrderInfo'),
                        name: 'UnreservedOrderInfo',
                        meta: { title: '订单审批件详情', noCache: true, activeMenu: '/internalManage/order/unreservedOrder' },
                        hidden: true
                    },
                    {
                        path: 'reservedOrder',
                        component: () =>
                            import ('@/views/internalManage/order/reservedOrder'),
                        name: 'ReservedOrder',
                        meta: { title: '已审核订单' }
                    },
                    {
                        path: 'reservedOrderInfo',
                        component: () =>
                            import ('@/views/internalManage/order/reservedOrder/reservedOrderInfo'),
                        name: 'ReservedOrderInfo',
                        meta: { title: '订单审批件详情', noCache: true, activeMenu: '/internalManage/order/reservedOrder' },
                        hidden: true
                    },
                    {
                        path: 'orderList',
                        component: () =>
                            import ('@/views/internalManage/order/orderList'),
                        name: 'OrderList',
                        meta: { title: '订单列表' }
                    },
                    {
                        path: 'orderDetail',
                        component: () =>
                            import ('@/views/internalManage/order/orderList/orderDetail'),
                        name: 'OrderDetail',
                        meta: { title: '订单详情', noCache: true, activeMenu: '/internalManage/order/orderList' },
                        hidden: true
                    }
                ]
            },
            {
                path: 'orgSet',
                component: () =>
                    import ('@/views/internalManage/orgSet/index'),
                name: 'OrgSet',
                meta: { title: '组织配置' },
                children: [{
                        path: 'orgList',
                        component: () =>
                            import ('@/views/internalManage/orgSet/orgList'),
                        name: 'OrgList',
                        meta: { title: '组织列表' }
                    },
                    {
                        path: 'orgInfo',
                        component: () =>
                            import ('@/views/internalManage/orgSet/orgInfo'),
                        name: 'OrgInfo',
                        meta: { title: '组织信息', noCache: true, activeMenu: '/internalManage/orgSet/orgList' },
                        hidden: true
                    },
                    {
                        path: 'departmentList',
                        component: () =>
                            import ('@/views/internalManage/orgSet/departmentList'),
                        name: 'DepartmentList',
                        meta: { title: '部门列表' }
                    },
                    {
                        path: 'departmentInfo',
                        component: () =>
                            import ('@/views/internalManage/orgSet/departmentInfo'),
                        name: 'DepartmentInfo',
                        meta: { title: '部门信息', noCache: true, activeMenu: '/internalManage/orgSet/departmentList' },
                        hidden: true
                    },
                    {
                        path: 'postList',
                        component: () =>
                            import ('@/views/internalManage/orgSet/postList'),
                        name: 'postList',
                        meta: { title: '岗位列表' }
                    },
                    {
                        path: 'postInfo',
                        component: () =>
                            import ('@/views/internalManage/orgSet/postInfo'),
                        name: 'PostInfo',
                        meta: { title: '岗位信息', noCache: true, activeMenu: '/internalManage/orgSet/postList' },
                        hidden: true
                    }
                ]
            },
            {
                path: 'clerkSet',
                component: () =>
                    import ('@/views/internalManage/clerkSet/index'),
                name: 'ClerkSet',
                meta: { title: '职员配置' },
                children: [{
                        path: 'clerkList',
                        component: () =>
                            import ('@/views/internalManage/clerkSet/clerkList'),
                        name: 'ClerkList',
                        meta: { title: '职员管理' }
                    }, {
                        path: 'clerkInfo',
                        component: () =>
                            import ('@/views/internalManage/clerkSet/clerkInfo'),
                        name: 'ClerkInfo',
                        meta: { title: '职员信息', noCache: true, activeMenu: '/internalManage/clerkSet/clerkList' },
                        hidden: true
                    },
                    {
                        path: 'permission',
                        component: () =>
                            import ('@/views/internalManage/clerkSet/clerkList/permission'),
                        name: 'Permission',
                        meta: { title: '权限管理', noCache: true, activeMenu: '/internalManage/clerkSet/clerkList' }
                    }
                ]
            },
            {
                path: 'fileSet',
                component: () =>
                    import ('@/views/internalManage/fileSet/index'),
                name: 'FileSet',
                meta: { title: '文件管理' },
                children: [{
                        path: 'notDone',
                        component: () =>
                            import ('@/views/internalManage/fileSet/notDone'),
                        name: 'NotDone',
                        meta: { title: '未办件' }
                    },
                    {
                        path: 'createFile',
                        component: () =>
                            import ('@/views/internalManage/fileSet/createFile'),
                        name: 'CreateFile',
                        meta: { title: '新建公文', noCache: true, activeMenu: '/internalManage/fileSet/notDone' },
                        hidden: true
                    },
                    {
                        path: 'particular',
                        component: () =>
                            import ('@/views/internalManage/fileSet/particular'),
                        name: 'Particular',
                        meta: { title: '详情公文', noCache: true, activeMenu: '/internalManage/fileSet/done' },
                        hidden: true
                    },
                    {
                        path: 'done',
                        component: () =>
                            import ('@/views/internalManage/fileSet/done'),
                        name: 'Done',
                        meta: { title: '已办件' }
                    }
                ]
            },
            {
                path: 'fileModuleSet',
                component: () =>
                    import ('@/views/internalManage/fileModuleSet/index'),
                name: 'fileModuleSet',
                meta: { title: '文件模块管理' },
                children: [{
                        path: 'fileModuleList',
                        component: () =>
                            import ('@/views/internalManage/fileModuleSet/fileModuleList.vue'),
                        name: 'FileModuleList',
                        meta: { title: '模板管理', noCache: true, activeMenu: '/internalManage/fileModuleSet/fileModuleList' }
                    },
                    {
                        path: 'addFileModule',
                        component: () =>
                            import ('@/views/internalManage/fileModuleSet/addFileModule.vue'),
                        name: 'AddFileModule',
                        meta: { title: '新建模板', noCache: true, activeMenu: '/internalManage/fileModuleSet/index' },
                        hidden: true
                    }
                ]
            },
        ]
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router