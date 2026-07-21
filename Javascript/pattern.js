const prompt = require("prompt-sync")();

let n = Number(prompt("Enter a number: "));

console.log("You entered:", n);

// print3()
// print4()
// print5()
// print6()
// _ _ _ * 
// _ _ * * * 
// _ * * * * * 
// * * * * * * * 
// print7()

// Enter a number: 4
// You entered: 4
// * * * * * * * 
// _ * * * * * 
// _ _ * * * 
// _ _ _ * 
//  print8()

// _ _ _ * _ _ _ 
// _ _ * * * _ _ 
// _ * * * * * _ 
// * * * * * * * 
// * * * * * * * 
// _ * * * * * _ 
// _ _ * * * _ _ 
// _ _ _ * _ _ _ 
//  print9()

print10()



function print10()
{
    for(let i=1;i<=2*n-1;i++)
    {
        str=""
for(let j=1;j<=i;j++)
{
    str+="* "
}

console.log(str)
    }
}
function print9() {
    for (let i = 1; i <= n ; i++) {
      str=""
      for(let j=1;j<=n-i;j++)
      {
        str+="_ "
      }
      for(let j=1;j<=2*i-1;j++)
      {
        str+="* "
      }
         for(let j=1;j<=n-i;j++)
      {
        str+="_ "
      }
        console.log(str)
    }
    for (let i = 1; i <= n ; i++) {
      str=""
      for(let j=1;j<=i-1;j++)
      {
        str+="_ "
      }
      for(let j=1;j<=2*n-2*i+1;j++)
      {
        str+="* "
      }
         for(let j=1;j<=i-1;j++)
      {
        str+="_ "
      }
        console.log(str)
    }
}

function print8() {
    for (let i = 1; i <= n; i++) {
        let str = ""
        for (let j = 1; j <= i - 1; j++) {
            str += "_ "
        }
        for (let k = 1; k <= 2 * n - 2 * i + 1; k++) {
            str += "* "
        }
        console.log(str)
    }
}

function print7() {
    for (let i = 1; i <= n; i++) {
        str = ""
        for (let j = 1; j <= n - i; j++) {
            str += "_ "
        }
        for (let k = 1; k <= 2 * i - 1; k++) {
            str += "* "
        }
        console.log(str)
    }

}
function print6() {

    // 12345
    // 1234
    // 123
    // 12
    // 1
    for (let i = 1; i <= n; i++) {
        let str = ""
        for (let j = 1; j <= n + 1 - i; j++) {
            str += j
        }
        console.log(str)
    }
}

function print5() {
    //     Enter a number: 5
    // You entered: 5
    // *****
    // ****
    // ***
    // **
    // *

    for (let i = n; i >= 1; i--) {
        let str = ""
        for (let j = 1; j <= i; j++) {
            str += "*"
        }
        console.log(str)

    }
}


function print4() {
    //     Enter a number: 5
    // You entered: 5
    // 1
    // 22
    // 333
    // 4444
    // 55555
    for (let i = 1; i <= n; i++) {
        let row = ""
        for (let j = 1; j <= i; j++) {
            row += i
        }
        console.log(row)
    }
}

function print3() {
    //     Enter a number: 5
    // You entered: 5
    // 1
    // 12
    // 123
    // 1234
    // 12345
    for (let i = 0; i < n; i++) {
        let row = ""

        for (let j = 1; j <= i + 1; j++) {
            row = row + j;
        }
        console.log(row)
    }
}
// function print2()
// {
// //     Enter a number: 5
// // You entered: 5
// // * 
// // * * 
// // * * * 
// // * * * * 
// // * * * * * 
//     for(let i=0;i<n;i++)
//     {
//         let str=""
//         for(let j=0;j<=i;j++)
//         {
//             str=str+"* "

//         }
//         console.log(str)
//     }
// }

// function print1()
// // Enter a number: 5
// // You entered: 5
// // * * * * * 
// // * * * * * 
// // * * * * * 
// // * * * * * 
// // * * * * * 
// {
// for(let i=0;i<n;i++)
// {
//     let row=""
//     for(let j=0;j<n;j++)
//     {
//         row+="* "
//     }
// console.log(row)
// }
// }