const inputs = document.querySelectorAll("input");
const submitBtn = document.querySelector("button");
const terms = document.getElementById("terms");
const errorLogger = document.getElementById("error-log");
// stores the two password elements to be compared against
let passwordElements = [];

const signupPage = document.querySelector('title').text == "Sign Up" ? true: false;

// disable terms of service and policy if we are not on the sign up page

if(!signupPage) document.getElementById('terms-agreement').style.display = 'none';

// Stores the validity states of the input elements
let validity = {
    email: false,
    password1: false,
    password2: false
}

submitBtn.onclick = () => submitForm();

inputs.forEach((input) => {
    // Listens to any change from user
    input.addEventListener("input", (e) => onInputChange(e.currentTarget));
    /* Listens when user focusses out of the input: this handles situation
        where the above even is not raised when user does not enter anything */
    input.addEventListener("focusout", (e) =>
        onInputChange(e.currentTarget, true)
    );

    if (input.type == "password") passwordElements.push(input);
});

// Form validation then submission
function submitForm() {
    if (!signupPage) return;

    // Only submit the form if all input is valid and terms are accepted
    // At the moment nothing will be submitted
    if (!checkAllValidity() || !terms.classList.contains('selected')) {
        submitBtn.disabled = true; 
        logErrorMsg(terms);
    }else{
        // clear all errors
        clearErrorMsg();
    }

    // handle situation where passwords may not be equal
    // this happens when user enters correct passwords and change
    // the original password. This leaves the confirm password unchecked
    // Therefore we have to compare the passwords again at the end
    onInputChange(passwordElements[1], true);

}

/* Logging the validity error to the screen 
*/
function logErrorMsg(target, logError = true) {
    // errorLogger.textContent = message;

    // if logError is true we log the error otherwise we clear
    if (logError) errorLogger.textContent = target.getAttribute('errorMessage');
    // clear error if possible
    else {
        // check if current error message if related to the element calling this function
        // if so then clear that error
        if (target.getAttribute('errorMessage') == errorLogger.textContent) clearErrorMsg();
    }
}

// clears any errors logged
function clearErrorMsg(){
    errorLogger.textContent = "";
}

// called when input has changed
function onInputChange(target, logError = false) {
    // if error message is true then log the message


    let hasError = () => {
        let res = false;
        switch (target.id) {
            case "email":
                res = inputHasError(target);
                validity.email = !res
                return res;
                break;
            case "password":
                res = inputHasError(target);
                validity.password1 = !res
                return res;
                break;
            case "confirm-password":
                res = !checkEqualPasswords();
                validity.password2 = !res
                return res
                break;
        }
    }

    //   If we have to log the error and there is an error then log it
    // This basically happens on focusout
    if (logError) {
        if (hasError()) {
            logErrorMsg(target);
            target.classList.add('error');
        }
    }
    // Other wise check if errors are being cleared
    // If so then remove the error class and clear error output
    // This happens on active keyboard typing
    else{
        if(!hasError()){
            target.classList.remove('error');
            logErrorMsg(target, logError);
        }
    }

    /* Check if all inputfields are valid  
    enable submit button is condition satsfied otherwise disable*/
    if(checkAllValidity()) submitBtn.disabled = false;
    else submitBtn.disabled = true;
};


// check if all input boxes have valid input
function checkAllValidity() {
    let isValid = true;
    // go through the validity object that stores the validity state of the inputs
    for (const valid of Object.values(validity)){
        isValid = isValid && valid;
    }

    // Handles log in page validation
    if (!signupPage) return validity.email && validity.password1;

    return isValid;
}


// Check if passwords are equal return true if equal and false otherwise
function checkEqualPasswords() {
    [p1, p2] = passwordElements
    return p1.value.length > 0 && p2.value.length > 0 && p1.value === p2.value;
}

// check input validity (Mainly for email and password)
// returning true if has error, false otherwise
function inputHasError(target) {
    const content = target.value;
    if (!(content.length > 0 && target.validity.valid)) return true
    return false;
}

// Accept terms of service event listener when clicked
terms.addEventListener("click", (e) => {
    e.target.classList.toggle("selected");

    // If all input are valid and terms are selected then enable submit button
    if(checkAllValidity() && e.target.classList.contains('selected')){
        submitBtn.disabled = false;
        logErrorMsg(terms, false)
    }
}
);
