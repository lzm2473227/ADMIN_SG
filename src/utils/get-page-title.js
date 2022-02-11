import defaultSettings from '@/settings'

const title = defaultSettings.title || '韶关全球商品交易平台'

export default function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return `${title}`
}