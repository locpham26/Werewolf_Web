/**
 @param {string} somebody
 */
function blah(somebody) {
    return true;
}

/** 
 @param {string[]} a
 @var
 */
function dcmm(a) {
    return 8;
}

/** 
 @class
 @param {Number} id - id của user
 @param {string} [default_name] - tên của user, default: "dit me may"
 */
class b {
    /**
     * 
     * @param {Number} id 
     * @param {String} default_name 
     */
    constructor(id, default_name) {
        this.id = id;
        
        if (!default_name) {
            this.default_name = "dit me may";
        }
        
        this.default_name = default_name;
    }
}