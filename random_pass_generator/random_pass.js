function genpass() {

var numb;
var passlength=10;
var newpass=[];
var item0;
var item1;
var item2;
var item3;
var a;

function randomCharset(numb)
{
    switch (numb) {
    case 1 : return String.fromCharCode(Math.floor(Math.random()*(90-66)+66));
    case 2 : return String.fromCharCode(Math.floor(Math.random()*(122-98)+98));
    default : return String.fromCharCode(Math.floor(Math.random()*(122-98)+98));
}
}
function randomInt()
{
    return String.fromCharCode(Math.floor(Math.random()*(57-49)+48));
}
function randomPunctuation(numb)
{   
    switch (numb) {
    case 1 : return String.fromCharCode(Math.floor(Math.random()*(64-34)+34));
    case 2 : return String.fromCharCode(Math.floor(Math.random()*(96-92)+92));
    case 3 : return String.fromCharCode(Math.floor(Math.random()*(126-124)+124));
    default: return String.fromCharCode(Math.floor(Math.random()*(64-34)+34));
    
        
    }
}
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}

function randomizze(numb) {
switch (numb) {
    case 1 : return randomInt();
    case 2 : return randomCharset(Math.floor(Math.random()*10%2)+1);
    case 3 : return randomPunctuation(Math.floor(Math.random()*10%3)+1);
   }
}
if (passlength<3){
document.write("Set passlength at least 3");
}
 else {
while (newpass.length != passlength){
if (newpass.length<=3){
item0 = randomInt();
newpass.push(item0);
item1 = randomCharset(Math.floor(Math.random()*10%2)+1);
newpass.push(item1);
item2 = randomPunctuation(Math.floor(Math.random()*10%3)+1);
newpass.push(item2);
} else { 
item3=randomizze(Math.floor(Math.random()*10%3)+1);
newpass.push(item3);
}
newpass=shuffle(newpass);
}
}
return newpass.join("");
}

function returnVal() {
document.getElementById("mypass").value = genpass();
}

function printPass(){
var textToSave = newpass;
var hiddenElement = document.createElement('a');
hiddenElement.href = 'data:attachment/text,' + encodeURI(newpass);
hiddenElement.target = '_blank';
hiddenElement.download = 'myPass.txt';
hiddenElement.click();    
}
