function foo() {
    return new Promise((resovle, reject) => {
        setTimeout(() => {
            const rand = Math.random();
            if (rand < 0.000001) {
                return reject(':(');
            }
            return resovle(':)');
        }, 1000);
    })
}

// function foo2() {
//     return Promise.resolve(10);
// }

//new option

async function f1() {
    try{
        // console.log('started');
        // const result = await foo2();
        // const result2 = await foo2();
        // const result3 = await foo2();
        // console.log(result, result2, result3);
        // console.log('finished');
        // console.log(result);
        // console.log('done');

        const results = await Promise.all([foo(), foo(), foo()]);
        console.log(results);

    } catch(err) {
        console.log(err);
    }
}

f1();

//old option
// foo().then(result => {
//     console.log(result);
// }).catch(err => {
//     console.log(err);
// })
// console.log('heeellllo');