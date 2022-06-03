// --------------- PROTOTYPES ---------------

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

String.prototype.setChar = function(index, char) {
    if (index > this.length - 1) {
        return this.toString();
    } else {
        return this.substring(0, index) + char + this.substring(index + 1);
    }
}

// --------------- PASSWORDS ---------------

const proverbs = ["Niedaleko pada jabłko od jabłoni", "Apetyt rośnie w miarę jedzenia",
                  "Darowanemu koniowi w zęby się nie zagląda", "Pierwsze koty za płoty",
                  "Nie taki diabeł straszny jak go malują", "Bez pracy nie ma kołaczy",
                  "Jak sobie pościelesz tak się wyśpisz", "Co dwie głowy to nie jedna",
                  "Nie chwal dnia przed zachodem słońca", "W zdrowym ciele zdrowy duch",
                  "Baba z wozu koniom lżej", "Co nagle to po diable", "Czas leczy rany",
                  "Serce nie sługa"];

const people = ["Dwayne Johnson", "Joe Biden", "Elon Musk", "Jeff Bezos", "Kylie Jenner",
                "Robert Downey Jr", "Cristiano Ronaldo", "Justin Bieber", "Oprah Winfrey",
                "Taylor Swift",  "Tiger Woods",  "Will Smith", "Jennifer Lopez",
                "Mark Zuckerberg", "Lionel Messi", "Selena Gomez", "LeBron James",
                "Fiodor Dostojewski", "John Ronald Reuel Tolkien", "Lew Tołstoj",
                "Fryderyk Chopin", "Stanisław Moniuszko", "George Orwell", "Joanne Rowling",
                "Johann Wolfgang Goethe"];

const films = ["Skazani na Shawshank", "Nietykalni", "Zielona mila", "Ojciec chrzestny",
               "Dwunastu gniewnych ludzi", "Forrest Gump", "Lot nad kukułczym gniazdem",
               "Lista Schindlera", "Pulp Fiction", "Joker", "Pianista", "Piękny umysł",
               "Incepcja", "Milczenie owiec", "Król Lew", "Leon zawodowiec"];

const books = ["Hobbit", "Zbrodnia i kara", "Władca pierścieni", "Nowy wspaniały świat",
               "Harry Potter", "Mały Książę", "Balladyna", "Ania z Zielonego Wzgórza",
               "Alchemik", "Boska komedia", "Don Kichot", "Faust", "Odyseja", "Iliada",
               "Król Edyp"];


let password = proverbs.random();
password = password.toUpperCase();
let hidden_password = "";
let number_of_mistakes = 0;
const alphabet = ["A", "Ą", "B", "C", "Ć", "D", "E",
                  "Ę", "F", "G", "H", "I", "J", "K",
                  "L", "Ł", "M", "N", "Ń", "O", "Ó",
                  "P", "Q", "R", "S", "Ś", "T", "U",
                  "V", "W", "X", "Y", "Z", "Ź", "Ż"];

for (let i = 0; i < password.length; i++) {
    password.charAt(i) === " " ? hidden_password += " " : hidden_password += "-";
}

// --------------- FUNCTIONS ---------------

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

function final_words(words) {
    const alphabet_container = document.getElementById("alphabet");
    alphabet_container.style.display = "flex";
    alphabet_container.style.flexDirection = "column";
    alphabet_container.style.justifyContent = "center";
    alphabet_container.style.alignItems = "center";
    alphabet_container.style.textAlign = "center";
    alphabet_container.innerHTML = "";

    const p = document.createElement("p");
    p.innerText = words += ` Prawidłowe hasło: ${password}`;
    alphabet_container.appendChild(p);

    const span = document.createElement("span");
    span.setAttribute("class", "reset");
    span.setAttribute("onclick", "location.reload();");
    span.innerText = "JESZCZE RAZ?";
    alphabet_container.appendChild(span);
}

function check(number) {
    let hitted = false;
    for (let i = 0; i < password.length; i++) {
        if (password.charAt(i) === alphabet[number]) {
            hidden_password = hidden_password.setChar(i, alphabet[number]);
            hitted = true;
        }
    }

    const div = document.getElementById(`letter${number}`);
    if (hitted === true) {
        div.style.background = "#003300";
        div.style.color = "#00C000";
        div.style.border = "3px solid #00C000";
        div.style.cursor = "default";
        show_password();
    } else {
        div.style.background = "#330000";
        div.style.color = "#C00000";
        div.style.border = "3px solid #C00000";
        div.style.cursor = "default";
        div.setAttribute("onclick", ";");

        number_of_mistakes++;
        let image_name = "img/s" + number_of_mistakes + ".jpg";
        document.getElementById("gallows").innerHTML = '<img src="' + image_name + '" alt="">';
    }

    if (password === hidden_password) {
        final_words("Tak jest!");
    }

    if (number_of_mistakes >= 9) {
        final_words("Przegrana!");
    }
}

start();