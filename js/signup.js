const signupBtn = document.querySelector("#signup-btn");
const emailText = document.querySelector(".email-text");
const passwordText = document.querySelector(".password-text");
const emailErr = document.querySelector(".error");


const validateEmail = () => {
  let typeMismatched = emailText.validity.typeMismatch;
  let lengthIncorrect = emailText.value.length < 1;
  return new Promise((resolve, reject) => {
    if (typeMismatched || lengthIncorrect) {
      reject(
        "Invalid email format",
        (() => {
          emailErr.className = "error active";
          emailErr.innerHTML = "Invalid email";
        })()
      );
    } else {
      resolve("VALID EMAIL");
    }
  });
};

const registerUser = async () => {
  emailErr.innerHTML = '';
  let user = {
    email: emailText.value,
    password: passwordText.value,
  };

  let url = "http://localhost:3000/api/v1/users/signup";
  try {
    await validateEmail();
    let response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(user),
    });
    let json = await response.json();
    console.log(json);
    if (json.success === true) {
      window.open('login.html', target="_self")
    } else {
      emailErr.innerHTML = json.error + "!";
    }
  } catch (error) {
    if (error === "Invalid email format") emailErr.innerHTML = error + "!";
    else emailErr.innerHTML = "An error occured!";
    console.log(error);
  }
};

let testClick = () => {
  emailErr.innerHTML = "Hello!";
  console.log('Hello!')
}

signupBtn.addEventListener("click", registerUser);
