var codeError = document.getElementById('code-error');


function validateCode() {
    var code = document.getElementById("iv-code").value;

    if(code.length == 0) {
        codeError.innerHTML = 'Invitation code is required';
        return false;
    }

    if (!code.match('564387')) {
        codeError.innerHTML = 'INCORRECT invitation code';
        return false;
    }
    codeError.innerHTML = 'Invitation Code Valid';
    return true
}