let password = "Bez pracy nie ma kołaczy";
password = password.toUpperCase();
let hidden_password = "";
const alphabet = ["A", "Ą", "B", "C", "Ć", "D", "E",
                  "Ę", "F", "G", "H", "I", "J", "K",
                  "L", "Ł", "M", "N", "Ń", "O", "Ó",
                  "P", "Q", "R", "S", "Ś", "T", "U",
                  "V", "W", "X", "Y", "Z", "Ź", "Ż"];

for (let i = 0; i < password.length; i++) {
    password.charAt(i) === " " ? hidden_password += " " : hidden_password += "-";
}

function show_password() {
    document.getElementById("board").innerHTML = hidden_password;
}

function start() {
    const alphabet_container = document.getElementById("alphabet");
    for (let i = 0; i < 35; i++) {
        const div = document.createElement("div");
        div.setAttribute("id", `letter${i}`);
        div.setAttribute("class", "letter");
        div.setAttribute("onclick", `check(${i})`);
        div.innerText = alphabet[i];
        alphabet_container.appendChild(div);
    }
    show_password();
}

function check(number) {
    for (let i = 0; i < password.length; i++) {
        if (password.charAt(i) == alphabet[number]) {
            alert(i); 
        }
    }
}

start();