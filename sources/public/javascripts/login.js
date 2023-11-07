const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

$(document).ready(function () {
    addUser()
    handleLogin()
});

async function handleLogin() {

    $('#loginButton').click(async function () {
        console.log("Have clicked login")
        var email = $("#email_login").val()
        var password = $("#password_login").val()

        console.log(email + password)

        const response = await login(email, password)
        console.log(response)

        if (response.status == "fail") {
            showFlashMessage(response.message, "danger")
        } else {

            // Save user information in local storage 
            localStorage.setItem('user', JSON.stringify(response.data))

            console.log(response.data.user.role)

            showFlashMessage("Đăng nhập thành công, đợi trong giây lát", "success")

            if (response.data.user.role == "Admin") {
                window.location.href = "/admin/account"
            } else {
                window.location.href = "/"
            }
        }

    });
}

async function addUser() {

    $('#registerButton').click(async function () {
        console.log("Have clicked")
        var name = $("#name_register").val()
        var email = $("#email_register").val()
        var password = $("#password_register").val()
        var confirmPassword = $("#confirm_register").val()

        console.log(name + email + password + confirmPassword)

        const response = await addToDB(name, email, password, confirmPassword)
        console.log(response)

        if (response.status == "fail") {
            showFlashMessage(response.message, "danger")
        } else {
            showFlashMessage("Đăng ký tài khoản mới thành công, vui lòng đăng nhập", "success")
        }

    });
}

async function addToDB(name, email, password, confirmPassword) {
    try {
        const response = await axios.post("http://localhost:3000/api/v1/auth/register", {
            name: name,
            email: email,
            password: password,
            passwordConfirm: confirmPassword
        })
        const data = response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

async function login(email, password) {
    try {
        const response = await axios.post(`http://localhost:3000/api/v1/auth/login`, {
            email: email,
            password: password
        })
        const data = response.data
        return data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

function showFlashMessage(message, type) {

    const flashAlert = document.querySelector('#flash-alert');
    flashAlert.innerText = message
    flashAlert.style.display = 'block';
    flashAlert.classList.remove('success', 'danger');

    if (type == 'danger') {
        flashAlert.classList.add('danger');
    } else {
        flashAlert.classList.add('success');
    }

    setTimeout(() => {
        $('#flash-alert').fadeOut(2000)
    }, 1000);
}
