"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCreatedDate = void 0;
exports.getCreatedDate = (format) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let created_date = "";
    switch (format) {
        case 1:
            created_date = year + '/' + month + '/' + day;
            break;
        case 2:
            created_date = day + '/' + month + '/' + year;
            break;
        default:
            created_date = year + '/' + month + '/' + day;
            break;
    }
    return created_date;
};
//# sourceMappingURL=getCreatedDate.js.map