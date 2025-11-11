export default {
    name: 'about',
    title: 'Trang Giới Thiệu',
    type: 'document',
    fields: [
        {
            name: 'language',
            title: 'Ngôn ngữ',
            type: 'string',
            options: {
                list: [
                    { title: 'Tiếng Việt', value: 'vi' },
                    { title: 'English', value: 'en' }
                ]
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'pageTitle',
            title: 'Tiêu đề trang',
            type: 'string',
            validation: Rule => Rule.required().max(60),
            description: 'Tối đa 60 ký tự'
        },
        // SEO Section
        {
            name: 'seo',
            title: 'Cấu hình SEO',
            type: 'object',
            fields: [
                {
                    name: 'metaTitle',
                    title: 'Meta Title',
                    type: 'string',
                    description: 'Tiêu đề SEO (50-60 ký tự)',
                    validation: Rule => Rule.max(60)
                },
                {
                    name: 'metaDescription',
                    title: 'Meta Description',
                    type: 'text',
                    description: 'Mô tả SEO (150-160 ký tự)',
                    validation: Rule => Rule.max(160)
                },
                {
                    name: 'keywords',
                    title: 'Từ khóa',
                    type: 'string',
                    description: 'Phân cách bằng dấu phẩy'
                }
            ]
        },
        // Section 1
        {
            name: 'section1',
            title: 'Section 1 - Giới thiệu chính',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Tiêu đề',
                    type: 'string',
                    validation: Rule => Rule.required()
                },
                {
                    name: 'p1',
                    title: 'Đoạn văn 1',
                    type: 'text'
                },
                {
                    name: 'p2',
                    title: 'Đoạn văn 2',
                    type: 'text'
                },
                {
                    name: 'readMore',
                    title: 'Text nút "Đọc thêm"',
                    type: 'string'
                },
                {
                    name: 'image',
                    title: 'Hình ảnh',
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                            description: 'Mô tả ảnh cho SEO'
                        }
                    ]
                }
            ]
        },
        // Section 2  
        {
            name: 'section2',
            title: 'Section 2 - Điểm mạnh',
            type: 'object',
            fields: [
                {
                    name: 'title',
                    title: 'Tiêu đề',
                    type: 'string',
                    validation: Rule => Rule.required()
                },
                {
                    name: 'desc',
                    title: 'Mô tả',
                    type: 'text'
                },
                {
                    name: 'list',
                    title: 'Danh sách tính năng',
                    type: 'array',
                    of: [{ type: 'string' }],
                    validation: Rule => Rule.min(1).max(10)
                },
                {
                    name: 'image',
                    title: 'Hình ảnh',
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                            description: 'Mô tả ảnh cho SEO'
                        }
                    ]
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'pageTitle',
            subtitle: 'language',
            media: 'section1.image'
        }
    }
}