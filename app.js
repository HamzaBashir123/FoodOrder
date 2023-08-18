import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  getDoc,
  getDownloadURL,
  ref,
  setDoc,
  signInWithEmailAndPassword,
  storage,
  uploadBytes,
} from "./firebaseConfig.js";

const LoginForm = document.getElementById("LoginForm");
const RegForm = document.getElementById("RegForm");
const Indicator = document.getElementById("Indicator");
const spinner = document.getElementById("spinner");
const loginHandler = document.querySelector(".loginHandler");
const registrationHandler = document.querySelector(".registrationHandler");
const registrationBtnHandler = document.querySelector(
  ".registrationBtnHandler"
);
const loginBtnHandler = document.querySelector(".loginBtnHandler");

// login form handler

function Login() {
  spinner.setAttribute("class", "spinner-dis-inline-block");
  const LoginEmail = LoginForm.LoginEmail.value;
  const LoginPassword = LoginForm.LoginPassword.value;
  console.log("email===>", LoginEmail, "password=======>", LoginPassword);

  if (!LoginEmail || !LoginPassword) {
    swal("Oops", "please fill out this fields !", "error");
    spinner.setAttribute("class", "spinner-dis-none");

    return false;
  }

  signInWithEmailAndPassword(auth, LoginEmail, LoginPassword)
    .then(async (userCredential) => {
      spinner.setAttribute("class", "spinner-dis-inline-block");
      const user = userCredential.user;
      swal("Signed in ", "You are successfully logged in", "success");
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      const userData = docSnap.data();

      if (!docSnap.exists()) {
        swal("Oops", "No such document!", "error");
        spinner.setAttribute("class", "spinner-dis-none");

        return false;
      }

      console.log("Document data:", docSnap.data());
      if (userData.AcountActivate === false) {
        swal("Oops", "your Acount is not Activate please waiting", "warning");
        spinner.setAttribute("class", "spinner-dis-none");
        return false;
      }

      if (userData.userType === "admin") {
        window.location.replace("/screens/admin.html");
      } else if (userData.userType === "Vendor ") {
        window.location.replace("/screens/vendor.html");
      } else {
        window.location.replace("/");
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      swal("Oops", errorMessage, "error");
      spinner.setAttribute("class", "spinner-dis-none");
    });
}

loginBtnHandler.addEventListener("click", Login);

// register form handler

const register = async () => {
  spinner.setAttribute("class", "spinner-dis-inline-block");
  const userName = document.getElementById("userName").value;
  const regEmail = document.getElementById("regEmail").value;
  const regPassword = document.getElementById("regPassword").value;
  const number = document.getElementById("number").value;
  const userType = document.getElementById("userType").value;
  const userImage = document.getElementById("userImage").files;
  console.log("userImage===========>", userImage);
  // console.log(userName, regEmail, regPassword, number, 'user type ====>', userType, userImage);
  if (
    !userName ||
    !regEmail ||
    !regPassword ||
    !number ||
    userType === "Acount Type" ||
    userImage.length == 0
  ) {
    swal("Oops", "please fill out this fields !", "error");
    spinner.setAttribute("class", "spinner-dis-none");

    return false;
  }
  createUserWithEmailAndPassword(auth, regEmail, regPassword)
    .then(async (user) => {
      console.log("user signUp successfully", user.user);
      const Image = await uploadImageToFirebase(userImage[0]);
      if (userType === "Vendor ") {
        const obj = {
          userName,
          userEmail: regEmail,
          userNumber: number,
          userType,
          AccountActivate: true,
          userImage: Image,
          uid: user.user.uid,
        };
        setDoc(doc(db, "users", user.user.uid), obj).then(() => {
          swal("welcome ", "To Bag Food", "success");
          setTimeout(() => {
            loginTapControl();
          }, 2000);
          spinner.setAttribute("class", "spinner-dis-none");
        });
        return;
      }

      const obj = {
        userName,
        userEmail: regEmail,
        userNumber: number,
        userType,
        AcountActivate: true,
        userImage: Image,
        uid: user.user.uid,
      };
      setDoc(doc(db, "users", user.user.uid), obj).then(() => {
        swal("welcome ", "To Foodies Web", "success");
        setTimeout(() => {
          loginTapControl();
        }, 2000);
        spinner.setAttribute("class", "spinner-dis-none");
      });
    })
    .catch((error) => {
      spinner.setAttribute("class", "spinner-dis-none");
      const errorMessage = error.message;
      swal("Oops", errorMessage, "error");
    });
};
registrationBtnHandler.addEventListener('click',register)
// user image file upload

const uploadImageToFirebase = async (file) => {
  let collectionImage;
  try {
    const storeageRef = ref(storage, "userImages/" + file.name);
    console.log(storeageRef)
    const upload = await uploadBytes(storeageRef, file);
    console.log("file uploaded");
    const imageUrl = await getDownloadURL(storeageRef);
    collectionImage = imageUrl;
  } catch (err) {
    console.log(err.msg);
  }
  return collectionImage;
};

// tap control
function registerTapControl() {
  LoginForm.style.transform = "translateX(0px)";
  RegForm.style.transform = "translateX(0px)";
  Indicator.style.transform = "translateX(100px)";
}

registrationHandler.addEventListener("click", registerTapControl);

function loginTapControl() {
  LoginForm.style.transform = "translateX(300px)";
  RegForm.style.transform = "translateX(300px)";
  Indicator.style.transform = "translateX(0px)";
}
loginHandler.addEventListener("click", loginTapControl);
