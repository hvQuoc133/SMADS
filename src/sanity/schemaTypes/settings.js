export default {
    name: 'settings',
    title: 'Cấu hình SEO',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Tiêu đề trang (Title)',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Mô tả (Meta Description)',
            type: 'text',
        },
        {
            name: 'keywords',
            title: 'Từ khóa (Meta Keywords)',
            type: 'string',
        },
        {
            name: 'ogImage',
            title: 'Ảnh chia sẻ (Open Graph)',
            type: 'image',
            options: { hotspot: true },
        },
    ],
}
