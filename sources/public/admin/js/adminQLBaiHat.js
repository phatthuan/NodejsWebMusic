$(document).ready(function () {

    // Check login
    confirmLogin()

    // Add Row
    $('#add-row').DataTable({
        "pageLength": 5,
    });

    showNotCompleted()
    showAllMusic()

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

function showNotCompleted() {
    $('#addSong').click(function () {
        showFlashMessage("Chức năng này chưa hoàn thiện, vui lòng thử lại sau!", "danger")
    });
}

function showAllMusic() {
    var action = '<td><div class="form-button-action"><button type="button" data-toggle="tooltip" title=""class="btn btn-link btn-primary btn-lg edit-button"data-original-title="Edit Task"><i class="fa fa-edit"></i></button><button type="button"class="btn btn-link btn-danger remove-button"data-original-title="Remove Task" data-toggle="modal"data-target="#deleteRowModal"><i class="fa fa-times"></i></button></div></td>';

    axios
        .get("http://localhost:3000/api/v1/songs?sort=+listen&limit=100")
        .then((response) => {
            const data = response.data.data.data

            const allMusic = data.map(function (music) {
                return {
                    title: music.title,
                    mainArtist: music.mainArtist,
                    thumbnail: music.thumbnail,
                    listen: music.listen,
                    like: music.like
                }
            })

            // console.log(allMusic)
            allMusic.forEach(function (music) {
                var thumbnail_image = `<img style="max-width: 120px; max-height: 120px;"src="${music.thumbnail}" alt="${music.thumbnail}">`
                // console.log(thumbnail_image)
                $('#add-row').dataTable().fnAddData([
                    music.title,
                    thumbnail_image,
                    music.mainArtist,
                    music.listen,
                    music.like,
                    action
                ]);
            })
        })
        .catch((error) => {
            console.log(error);
        });
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

        showFlashMessage("Xóa bài hát " + name + " thành công", "success")

    });

});

$(document).on('click', '.edit-button', function () {
    showFlashMessage("Chức năng này chưa hoàn thiện, vui lòng thử lại sau!", "danger")

});
