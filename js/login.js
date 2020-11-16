const loginBtn = document.querySelector("#login-btn");
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

const loginUser = async () => {
  emailErr.innerHTML = '';
  let user = {
    email: emailText.value,
    password: passwordText.value,
  };
  console.log(JSON.stringify(user))

  let url = "http://localhost:3000/api/v1/users/signin";
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
    let token = json.token;
    //save token to local storage
    localStorage.setItem("token", JSON.stringify(token));
    console.log(`Json = ${JSON.stringify(json)}\nToken = ${token}`);
    if (json.success === true) {
      window.open('diary.html', target="_self")
    }else {
      emailErr.innerHTML = json.error + "!";
    }
  } catch (error) {
    if (error === "Invalid email format") emailErr.innerHTML = error + "!";
    else if (error == "TypeError: Failed to fetch") emailErr.innerHTML = "An error occured!";
    else emailErr.innerHTML = "Invalid Email/Password"
    console.log(error);
  }
  console.log(JSON.parse(localStorage.getItem("token")));
};

let testClick = () => {
  emailErr.innerHTML = "Hello!";
  console.log('Hello!')
}

loginBtn.addEventListener("click", loginUser);