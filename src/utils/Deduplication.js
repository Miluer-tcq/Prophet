export function Deduplication(arr) {
    let obj = {};
    let newArr = [];
    for (let i=0;i<arr.length;i++){
        if(!obj[arr[i]]){
            obj[arr[i]] = true;
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
