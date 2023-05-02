const form = document.querySelector("form");
eField = form.querySelector(".email"),
eInput = eField.querySelector("input"),

pField = form.querySelector(".password"),
pInput = pField.querySelector("input");

CField = form.querySelector(".password-confirm"),
cInput = CField.querySelector("input");

FField = form.querySelector(".full_name"),
fInput = FField.querySelector("input");

UField = form.querySelector(".user_name"),
uInput = UField.querySelector("input");

form.onsubmit = (e) => {
    e.preventDefault();

    (eInput.value == "") ? eField.classList.add("shake", "error"): checkEmail();
    (pInput.value == "") ? pField.classList.add("shake", "error"): checkPass();
    (cInput.value == "") ? CField.classList.add("shake", "error"): checkConfirmPass();
    (fInput.value == "") ? FField.classList.add("shake", "error"): checkFullName();
    (uInput.value == "") ? UField.classList.add("shake", "error"): checkUsername();

    if (pInput.value  && cInput.value) {
        confirmPassword();
    }


    setTimeout(() => {
        eField.classList.remove("shake");
        pField.classList.remove("shake");
        CField.classList.remove("shake");
        FField.classList.remove("shake");
        UField.classList.remove("shake");

    }, 500);

    eInput.onkeyup = () => { checkEmail(); }
    pInput.onkeyup = () => { checkPass(); }

    function checkEmail() {
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!eInput.value.match(pattern)) {
            eField.classList.add("error");
            eField.classList.remove("valid");
            let errorTxt = eField.querySelector(".error-txt");

            (eInput.value != "") ? errorTxt.innerText = "Enter a valid email address": errorTxt.innerText = "Email can't be blank";
        } else {
            eField.classList.remove("error");
            eField.classList.add("valid");
        }
    }

    function checkPass() {
        if (pInput.value == "") {
            pField.classList.add("error");
            pField.classList.remove("valid");
        } else {
            pField.classList.remove("error");
            pField.classList.add("valid");
        }
    }

    if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
        window.location.href = form.getAttribute("action");
    }

    function checkConfirmPass() {
        if (cInput.value == "") {
            CField.classList.add("error");
            CField.classList.remove("valid");
        } else {
            CField.classList.remove("error");
            CField.classList.add("valid");
        }
    }

    function checkFullName() {
        if (fInput.value == "") {
            FField.classList.add("error");
            FField.classList.remove("valid");
        } else {
            FField.classList.remove("error");
            FField.classList.add("valid");
        }
    }

    function checkUsername() {
        if (uInput.value == "") {
            UField.classList.add("error");
            UField.classList.remove("valid");
        } else {
            UField.classList.remove("error");
            UField.classList.add("valid");
        }
    }


   function confirmPassword () {
       if (pInput.value != cInput.value) {
           CField.classList.add("error");
           CField.classList.remove("valid");
       } else {
           CField.classList.remove("error");
           CField.classList.add("valid");
       }
   }



    fetch('http://localhost:3000/auth/signup', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "fullName" : fInput.value,
        "userName" : uInput.value,
        "email" : eInput.value,
        "password" : pInput.value,
    })
}).then(async response =>  await response.json())
    .then(data => {
        if (data.statusCode == 403){
            alert("email already exists");
        }
        else if (data.statusCode == 400){
        
        }
        else if (data.access_token) {
            console.log(document.cookie);
            window.location.href = "../Login-Page/login.html";
        } 
    })
    .catch((error) => {
        console.error('Error:', error);
    });

   
}