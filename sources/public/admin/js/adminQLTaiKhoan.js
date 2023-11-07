$(document).ready(function () {

    // Check login
    confirmLogin()

    // Add Row
    $('#add-row').DataTable({
        "pageLength": 5,
    });

    showAllUser()
    addUser()
});

async function confirmLogin() {
    if (localStorage.getItem('user')) {
        var user = JSON.parse(localStorage.getItem('user'))
        console.log(user)

        $(".name_user").text(user.user.name)
        $(".email_user").text(user.user.email)
        $(".name_sidebar").html(user.user.name + `<span class="user-level">Administrator</span>`)

        $("#logout_button").click(async function () {

            // Clear local storage for user
            console.log("logout")
            localStorage.removeItem('user')

            const message_logout = await logout()
            console.log(message_logout)

            window.location.href = "/login"
        })
    } else {
        // Go to login page if you are not loggin
        window.location.href = "/login"
    }
}

async function logout() {
    try {
        const response = await axios.post("http://localhost:3000/api/v1/auth/logout")
        const data = response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

async function showAllUser() {
    const allUser = await getAllAccountFromDB()
    console.log(allUser.data.data)

    var action = `<td>
                    <div class="form-button-action">
                        <button type="button"
                            class="btn btn-link btn-danger remove-button"
                            data-original-title="Remove Task" data-toggle="modal"
                            data-target="#deleteRowModal">
                            <i class="fa fa-times"></i>
                        </button>
                    </div>
                </td>`

    allUser.data.data.forEach(function (user) {
        console.log(user)

        $('#add-row').dataTable().fnAddData([
            user.name,
            user.email,
            user.role,
            action
        ]);
    })
}

async function getAllAccountFromDB() {
    try {
        const response = await axios.get("http://localhost:3000/api/v1/auth/accounts?limit=50")
        const data = response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

async function addUser() {

    var action = `<td> 
                    <div class="form-button-action"> 
                        <button type="button"class="btn btn-link btn-danger remove-button"
                            data-original-title="Remove Task" data-toggle="modal"
                            data-target="#deleteRowModal">
                            <i class="fa fa-times"></i>
                        </button> 
                    </div> 
                </td>`;

    $('#addRowButton').click(async function () {
        console.log("Have clicked")
        var name = $("#addName").val()
        var email = $("#addEmail").val()
        var password = $("#addPassword").val()
        var confirmPassword = $("#confirmPassword").val()

        console.log(name + email + password + confirmPassword)

        const response = await addToDB(name, email, password, confirmPassword)
        console.log(response)

        if (response.status == "fail") {
            showFlashMessage(response.message, "danger")
        } else {
            showFlashMessage("Thêm người dùng thành công", "success")
            $('#add-row').dataTable().fnAddData([
                $("#addName").val(),
                $("#addEmail").val(),
                action
            ]);
        }
        $('#addRowModal').modal('hide');

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

function showFlashMessage(message, type) {

    const flashAlert = document.querySelector('#flash-alert');
    flashAlert.innerText = message
    flashAlert.style.display = 'block';
    flashAlert.classList.remove('alert-success', 'alert-danger');

    if (type == 'danger') {
        flashAlert.classList.add('alert-danger');
    } else {
        flashAlert.classList.add('alert-success');
    }

    setTimeout(() => {
        $('#flash-alert').fadeOut(2000)
    }, 1000);
}

$(document).on('click', '.remove-button', function () {
    var row_delete = this.parentElement.parentElement.parentElement
    var name = this.parentElement.parentElement.parentElement.children[0].innerText
    console.log(row_delete)

    $("#confirm_name").text(name)

    $('#deleteRowButton').off('click').on('click', function () {

        $('#add-row').dataTable().fnDeleteRow(row_delete);
        $('#deleteRowModal').modal('hide');

        showFlashMessage("Xóa người dùng " + name + " thành công", "success")
    });

});

