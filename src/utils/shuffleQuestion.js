const ShuffleQuestions = (arr) => {
    let newArr = [];
    while(arr.length) {
     const random = Math.floor(Math.random() * arr.length);
     newArr.push(arr[random]);
     arr.splice(random,1);
   }
    return newArr;
}

export default ShuffleQuestions;