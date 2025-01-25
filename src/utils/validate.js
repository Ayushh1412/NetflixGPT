export const validateSignInData = (email, password, fullname,type) => {
  const validateEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
  const validatePass =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(password);
  const validateName = /^[a-zA-Z\s]{3,30}$/g.test(fullname);
  if (fullname == "") {
    return "Fullname is required";
  }
  if (email == "") {
    return "Email is required";
  }
  if (password == "") {
    return "Password is required";
  }
  if (!validateName) {
    return "Name is not valid";
  }
  if (!validateEmail) {
    return "Email is not valid";
  }
  if (!validatePass && type == "signup") {
    return "Password is not valid";
  }
return null;
};
