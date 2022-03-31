const signout = document.getElementsByClassName("signout")

signout[0].addEventListener("click", function() {
    window.location.href = "/index.html";
    localStorage.removeItem("signed_in")
    localStorage.removeItem("token")

})
console.log(signout)