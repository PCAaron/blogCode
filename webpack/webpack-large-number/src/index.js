export default function add(a,b) {
    let i = a.length - 1;
    let j = b.length - 1;

    let carry = 0; // 进位
    let ret = '';
    while(i >= 0 || j >= 0){
        let x = 0; // 定义x位数上的值
        let y = 0; // 定义y位数上的值
        let sum; // 定义求和的值

        if (i >=0 ) {
            x = a[i] - '0'; // 将字符串转换为数字
            i -- ;
        }

        if (j >=0 ) {
            y = b[j] - '0'; // 将字符串转换为数字
            j -- ;
        }

        sum = x + y + carry;

        if( sum >= 10) {
            carry = 1;
            sum -= 10;
        } else {
            carry = 0
        }

        ret = sum + ret;
    }

    if (carry) {
        ret = carry + ret;
    }

    return ret
}

// add('99', '1')