export function isPositive(num:number):boolean {
    return num >= 0;
}

export function isInteger(num:number):boolean {
    const int:number = Math.floor(num);
    return int === num;
}

export function isPositiveInteger(num:number){
    return isPositive(num) && isInteger(num);
}