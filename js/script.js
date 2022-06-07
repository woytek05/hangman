// -------------------- CLASSES --------------------

class Letter {
    constructor(char, selected) {
        this.char = char;
        this.selected = selected;
    }
}

// -------------------- PROTOTYPES --------------------

Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

String.prototype.setChar = function (index, char) {
    if (index > this.length - 1) {
        return this.toString();
    } else {
        return this.substring(0, index) + char + this.substring(index + 1);
    }
}

// -------------------- VARIABLES AND ARRAYS --------------------

const proverbs = ["Niedaleko pada jabłko od jabłoni", "Apetyt rośnie w miarę jedzenia",
    "Darowanemu koniowi w zęby się nie zagląda", "Pierwsze koty za płoty",
    "Nie taki diabeł straszny jak go malują", "Bez pracy nie ma kołaczy",
    "Jak sobie pościelesz tak się wyśpisz", "Co dwie głowy to nie jedna",
    "Nie chwal dnia przed zachodem słońca", "W zdrowym ciele zdrowy duch",
    "Baba z wozu koniom lżej", "Co nagle to po diable", "Czas leczy rany",
    "Serce nie sługa"];

const people = ["Dwayne Johnson", "Joe Biden", "Elon Musk", "Jeff Bezos", "Kylie Jenner",
    "Robert Downey Jr", "Cristiano Ronaldo", "Justin Bieber", "Oprah Winfrey",
    "Taylor Swift", "Tiger Woods", "Will Smith", "Jennifer Lopez",
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

let password = "";
let array_name = sessionStorage.getItem("array_name");

if (array_name === "proverbs") {
    password = proverbs.random();
} else if (array_name === "people") {
    password = people.random();
} else if (array_name === "films") {
    password = films.random();
} else if (array_name === "books") {
    password = books.random();
}

password = password.toUpperCase();
let hidden_password = encrypt_password(password);
let selected_letter = "";
let number_of_mistakes = 0;
const alphabet = ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F",
    "G", "H", "I", "J", "K", "L", "Ł", "M", "N",
    "Ń", "O", "Ó", "P", "Q", "R", "S", "Ś", "T",
    "U", "V", "W", "X", "Y", "Z", "Ź", "Ż"];
const letters = [];
alphabet.forEach(char => letters.push(new Letter(char, false)));
const yes = new Audio("audio/yes.wav");
const no = new Audio("audio/no.wav");


// -------------------- FUNCTIONS --------------------

function show_password() {
    document.getElementById("board").innerHTML = `<p>${hidden_password}</p>`;
}

function encrypt_password(password) {
    let hidden_password = "";
    for (let i = 0; i < password.length; i++) {
        password.charAt(i) === " " ? hidden_password += " " : hidden_password += "-";
    }
    return hidden_password;
}

function start() {
    const alphabet_container = document.getElementById("alphabet");
    letters.forEach((letter) => {
        const div = document.createElement("div");
        div.setAttribute("id", letter.char);
        div.setAttribute("class", "letter");
        div.setAttribute("onclick", `select('${letter.char}');`);
        div.innerText = letter.char;
        alphabet_container.appendChild(div);
    });
    show_password();
}

function add_selection_color(letter) {
    if (letter != "") {
        document.getElementById(letter).classList.add("selection-color");
    }
}

function remove_selection_color(letter) {
    if (letter != "") {
        document.getElementById(letter).classList.remove("selection-color");
    }
}

function select(_letter) {
    letters.forEach((letter) => {
        if (letter.char === _letter) {
            if (letter.selected) {
                remove_selection_color(selected_letter);
                selected_letter = "";
                letter.selected = false;
            } else {
                remove_selection_color(selected_letter);
                selected_letter = letter.char;
                add_selection_color(selected_letter);
                letter.selected = true;
            }
        } else {
            letter.selected = false;
        }
    });
}

function final_words(words) {
    const keyboard = document.getElementById("keyboard");
    keyboard.style.display = "flex";
    keyboard.style.flexDirection = "column";
    keyboard.style.justifyContent = "center";
    keyboard.style.alignItems = "center";
    keyboard.style.textAlign = "center";
    keyboard.innerHTML = "";

    const p = document.createElement("p");
    p.innerText = words += ` Prawidłowe hasło: ${password}`;
    keyboard.appendChild(p);

    const span = document.createElement("span");
    span.setAttribute("class", "reset shake-bottom");
    span.setAttribute("onclick", "location.reload();");
    span.innerText = "JESZCZE RAZ?";
    keyboard.appendChild(span);
}

function check(letter) {
    const div = document.getElementById(letter);
    div.classList.add("rotate-center");
    let hitted = false;
    for (let i = 0; i < password.length; i++) {
        if (password.charAt(i) === letter) {
            hidden_password = hidden_password.setChar(i, letter);
            hitted = true;
        }
    }

    if (letter != "") {
        if (hitted) {
            yes.play();
            div.style.background = "#003300";
            div.style.color = "#00C000";
            div.style.border = "3px solid #00C000";
            div.style.cursor = "default";
            show_password();
        } else {
            no.play();
            div.style.background = "#330000";
            div.style.color = "#C00000";
            div.style.border = "3px solid #C00000";
            div.style.cursor = "default";
            div.setAttribute("onclick", ";");

            number_of_mistakes++;
            let image_name = "img/s" + number_of_mistakes + ".jpg";
            document.getElementById("gallows").innerHTML = '<img src="' + image_name + '" alt="">';
        }
    }

    if (password === hidden_password) {
        final_words("Brawo!");
    }

    if (number_of_mistakes >= 6) {
        final_words("Przegrana!");
    }
}

// -------------------- EVENTS --------------------

alphabet.forEach(letter => document.addEventListener("keydown", (event) => {
    if (!event.ctrlKey && !event.altKey &&
        (event.key === letter.toLowerCase() || event.key === letter)) {
        select(letter);
    }
}));

document.getElementById("enter").addEventListener("click", () => {
    check(selected_letter);
    selected_letter = "";
})

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        check(selected_letter);
        selected_letter = "";
    }
});

start();