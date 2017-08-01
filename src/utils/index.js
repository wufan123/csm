var phoneReg = /^1[3578]\d{9}$/;
var numberReg = /^[0-9]*$/;
var IDCardReg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

export function isPhone(val) {
    return phoneReg.test(val)
}
export function isNumber(val) {
    return numberReg.test(val)
}
export function isIDCard(val) {
    return IDCardReg.test(val)
}