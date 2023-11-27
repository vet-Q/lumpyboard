function getValuesAsObject(obj, keys) {
    let resultObj = {};
    keys.forEach(key => {
        //         // 배열을 돌면서 원하는 키를 한번 순회하면서 값이 있으면 값을 추출하고, 없으면 null을 할당함.
        resultObj[key] = obj.hasOwnProperty(key) ? obj[key] : null;
    });
    // 할당된 객체를 반환함.
    return resultObj;
}


function getValuesAsArray(obj, keys) {
    //  할당된 객체에서 값을 찾아 반환함
    return  obj[keys] ? obj[keys] : `we can't find measures`
}


// 중첩된 객체에서 주어진 키 배열을 사용하여 값을 가져와 새로운 객체를 생성하는 함수
// 1) 주어진 키들을 순회하고,
// 2) 원본 객체에 키가 없으면 null을 할당함.
// 3) 모든 객체를 돌면서, 상속된 키가 아닌 값에 대해
// 4) 객체 내 객체인 경우 재귀함수 소환해서 값 추출
function extractKeysFromNestedObject(obj, keys) {
    let newObj = {};

    // 주어진 키들을 순회
    for (let desiredKey of keys) {
        if (obj.hasOwnProperty(desiredKey)) {
            newObj[desiredKey] = obj[desiredKey];
        } else {
            newObj[desiredKey] = null;  // 원본 객체에 키가 없으면 null 할당
        }
    }

    for (let key in obj) {
        if (obj.hasOwnProperty(key) && typeof obj[key] === 'object' && obj[key] !== null) {
            let nestedObj = extractKeysFromNestedObject(obj[key], keys);
            // 결과 객체에 키가 있는 경우만 리턴하는 newObj에 키 추가
            if (Object.keys(nestedObj).some(k => keys.includes(k))) {
                newObj[key] = nestedObj;
            }
        }
    }
    return newObj;
}

module.exports = {
    getValuesAsObject,
    getValuesAsArray,
    extractKeysFromNestedObject
}