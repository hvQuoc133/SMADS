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
            validation: Rule => Rule.required()
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
                    type: 'string'
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
                    options: { hotspot: true }
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
                    type: 'string'
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
                    of: [{ type: 'string' }]
                },
                {
                    name: 'image',
                    title: 'Hình ảnh',
                    type: 'image',
                    options: { hotspot: true }
                }
            ]
        }
    ]
}