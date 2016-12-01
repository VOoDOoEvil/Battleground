
function validateForm() {

    var checkName = document.forms["form"]["username"].value;
    var checkPassword = document.forms["form"]["password"].value;

    if (checkName == "test" && checkPassword == "test") {
        return true;
    } else {
        alert("Neplatne jmeno nebo heslo!!!");
        return false;
    }
}