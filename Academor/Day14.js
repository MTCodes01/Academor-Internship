document.write("Today was Javascript loops and conditions<br><br><br>")
// comparison
var a = 10;
var b = "10";
document.write(a == b); // compares the values
document.write("<br>", a === b); // compares the data types
for (i = 0; i <= 10; i++) {
  document.write("<br>The vaue of i is ", i);
}

function x(){
    for (y = 0; y <= 10; y++) {
        document.write("<br>Welcome all")
    }
}
x()

var x = parseInt(prompt("Enter 1st number: "));
var y = parseInt(prompt("Enter 2nd number: "));
for (i = 1; i <= y; i++) {
  document.write("<br>", x + i);
}

// array
let myarray=[1,2,3,45,67,8,true]
for (y = 0; y <= 6; y++) {
    document.write("<br>>The value is ", myarray[y]);
}
console.log(myarray)

for (i in myarray){
    document.write("<br>>The value is ", i);
}
document.write("<br>")
for (i of myarray){
    document.write("<br>>The value is ", i);
}
document.write("<br>")

var x = parseInt(prompt("Enter a number: "));
if (x%2==0){
    document.write("<br>The number is even!")
}
else{
    document.write("<br>The number is odd!")
}

var num = [1, 23, 45, 6, 7, 8, 90];
for (a1 = 1; a1 < 10; a1 += 2) {
  document.write("<br>The odd number is : ", a1);
}
document.write("<br>");
for (a1 = 2; a1 < 10; a1 += 2) {
  document.write("<br>The even number is : ", a1);
}
document.write("<br>")
if (num%2==0){
    document.write("<br>The number is even!")
}
else{
    document.write("<br>The number is odd!")
}

var username = prompt("Enter Your username : ");
var password = parseInt(prompt("Enter password : "));
if (username == "Admin" && password == 123) {
  alert("You're logged in");
} else if (username != "Admin" || password != 123) {
  alert("Incorrect username or password!");
} else {
  alert("Incorrect username and password!");
}
