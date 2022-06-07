function choose_array(array_name) {
    if (array_name === "proverbs") {
        sessionStorage.setItem("array_name", "proverbs");
    } else if (array_name === "people") {
        sessionStorage.setItem("array_name", "people");
    } else if (array_name === "films") {
        sessionStorage.setItem("array_name", "films");
    } else if (array_name === "books") {
        sessionStorage.setItem("array_name", "books");
    }
    document.location.href = "hangman.html";
}