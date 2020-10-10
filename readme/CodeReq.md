# Yêu cầu chung cho phần code

1. Test
    - Tất cả code **phải** được test (trừ một số phần Frontend)
        * File test sẽ nằm trong thư mục test của module
        * Test sẽ được viết trước khi code:
            Ví dụ: [ExTDD.md](ExTDD.md)
        * Test sẽ phải cover tất cả code và các trường hợp có thể xảy ra:
            Trường hợp 1, many, limit, ...
        * Tên của test dài bao nhiêu cũng được miễn là phải dễ hiểu và bao quát nội dung test

2. Quy tắc module:
    - Mỗi module **phải** nằm trong thư mục riêng của nó
    - Nếu quá nhỏ để cho vào thư mục riêng, hãy cân nhắc đưa vào module Util (module chung để lưu các chức năng nhỏ)

3. Comment:
    - Tất cả function **phải** được comment tác dụng và cách sử dụng (các param, type, sử dụng @param), tác dụng phụ (nếu có)
    - Comment **tất cả** constant
    - Comment đủ, không comment thừa
    - Sử dụng syntax của JSDoc để comment (docs: [JSDOC'sDocs](https://jsdoc.app))
    - Ví dụ: [CodeFormat.js](CodeFormat.js)
    - Nếu quá nhiều params, code xong function chỉ cần gõ /** rồi enter, vscode sẽ auto gen ra comment cho các params.

3. Format code:
    - Dùng { cùng dòng với function trong mọi trường hợp
        + Ví dụ: [CodeFormat.js](CodeFormat.js)
    - Các Functions cách nhau 1 dòng
    - Dùng **;** ở cuối dòng code (đcm Python)
    - if, else if, else format: [else-if.js](else-if.js)
    - Tên các function sẽ theo format: `fucntion tenCuaFunctionLaDcmm()`
    - Tên của variable sẽ theo format: `var ten_variable_la_dcmm`
    - Tên của Constant sẽ theo format: `const CONSTANT_DAM_VAO_MOM_ME_MAY`

4. Git:
    - Không được tự ý merge code vào branch khác
    - Mỗi khi hoàn thành module của mình, phải đảm bảm tất cả các test chạy thành công
    - Tạo Pull Request mỗi khi hoàn thành xong một module đã được giao