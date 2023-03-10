const mathProblem = (msg) => {
    let uniqueElements = [];
    let repeatedQty = [];
    let counter = 1;
    const result = []
    const totalNumbers = []
    for (let i = 0; i<msg; i++) {
        const randomNumber = Math.floor(Math.random() * 1000);
        result.push(randomNumber)
    }
    result.sort()
    for (let i = 0; i < result.length; i++ ){
        if(result[i+1] === result[i]) {
            counter++;
        } else {
            uniqueElements.push(result[i]);
            repeatedQty.push(counter);
            counter = 1
        }
    }
    for (let i = 0; i < uniqueElements.length; i++) {
        let objeto = {
            number: uniqueElements[i],
            quantity: repeatedQty[i]
        }
        totalNumbers.push(objeto)
    }
    return totalNumbers
}

process.on('message', msg => {
    process.send(mathProblem(msg))
})

export default mathProblem