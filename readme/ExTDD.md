# Hướng dẫn chung chung cho TDD

Khi viết code theo TDD, test sẽ được viết trước, và code sẽ viết sau:

## Ví dụ 1: class
File test:
```
    var assert = require("assert");
    describe('Test_user', function() {
        describe('#createUser()', function() {
            var user = new User(6969, "Long oc cho");
            var user1 = new User(6969, "Long oc buoi")
            assert.equal(user.id, user.id);
            assert.notEqual(user.ten, user.ten);
        });
    });
```

Class User:

```
    class User {
        constructor(id, ten) {
            this.id = id;
            this.ten = ten;
        }
    }
```

Khi muốn tạo một method cho class, ta phải viết test trước
Ví dụ, method đổi tên

File test: 
```
    var assert = require("assert");
    describe('Test_user', function() {
        describe('#createUser()', function() {
            var user = new User(6969, "Long oc cho");
            var user1 = new User(6969, "Long oc buoi")
            assert.equal(user.id, user.id);
            assert.notEqual(user.ten, user.ten);
        });

        describe("#updateName()", function() {
            var user = new User(6969, "Long oc cho");
            user.updateName("Long hoi oc cho");

            assert.equal(user.ten, "Long hoi oc cho");
        });
    });
```

Sau đó mới viết method trong class

Class User:
```
    class User {
        constructor(id, ten) {
            this.id = id;
            this.ten = ten;
        }

        updateName(ten) {
            this.ten = ten 
        }
    }
```

## Ví dụ 2: function

File test:
```
    var assert = require("assert");
    // import function cong() cực mạnh

    describe('Test_function', function() {
        describe('#testFunction()', function() {
            assert.equal(cong(1, 2), 3);
        });
    });
```

Sau đó:
Module function:
```
    var cong = function (a, b) {
        return a + b;
    }

    exports.default = cong;
```

> Mới đầu việc này tưởng chừng như rất phản logic, vì test đi trước cả code thật, nhưng việc làm như thế này sẽ khiến tất cả code của chúng ta được test kĩ càng.
> 
> Khi tất cả code đã được test, nếu mất mã nguồn hoặc mã nguồn quá lỗi, chúng ta có thể xây dựng lại code mà không cần phải lật lại cấu trúc dự án từ đầu.