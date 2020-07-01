const _I64BIT_TABLE = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

function uuid(len, radix) {
    const chars = _I64BIT_TABLE;
    let uuid = [];
    radix = radix || chars.length;
    if(len){
        for (let i = 0; i < len; i++) {
            uuid[i] = chars[0 | Math.random() * radix];
        }
    }else {
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        for (let i = 0; i < 36; i++) {
            if (!uuid[i]) {
                let r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}

function hash(input) {
    let hash = 5381;
    let i = input.length - 1;
    if (typeof input == 'string') {
        for (; i > -1; i--)
            hash += (hash << 5) + input.charCodeAt(i);
    } else {
        for (; i > -1; i--)
            hash += (hash << 5) + input[i];
    }
    let value = hash & 0x7FFFFFFF;
    let retValue = '';
    do {
        let index = value & 0x3F;

        if(index >= _I64BIT_TABLE.length){
            index -= _I64BIT_TABLE.length;
        }
        retValue += _I64BIT_TABLE[index];
    } while (value >>= 6);
    return retValue;
}

export const uuidUntil = {
    uuid,
    hash
}