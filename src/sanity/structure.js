// structure.js
export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      // Thêm các document types của bạn vào đây
      ...S.documentTypeListItems(),

      // Hoặc custom structure nếu muốn:
      // S.listItem()
      //   .title('Cấu hình SEO')
      //   .child(S.document().schemaType('settings').documentId('settings')),
      // S.listItem()
      //   .title('Trang Giới Thiệu')
      //   .child(S.documentTypeList('about')),
    ]);