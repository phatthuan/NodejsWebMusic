$(document).ready(function () {

    // Check login
    confirmLogin()

    // Add Row
    $('#add-row').DataTable({
        "pageLength": 5,
    });

    // Music table
    $('#music-table').DataTable({
        "pageLength": 5,
    });

    showAllCategory()
    addCategory()
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

function showAllCategory() {

    axios
        .get("http://localhost:3000/api/v1/genres")
        .then((response) => {
            const data = response.data.data.data

            const allTitle = data.map(function (title) {
                return {
                    id: title.id,
                    title: title.title,
                }
            })

            allTitle.forEach(function (title) {

                var action = `<td><div id="${title.id}" class="form-button-action"><a role="button" class="btn btn-link btn-primary btn-lg detail-button" href="#detail"><i class="fas fa-info-circle"></i></a></div></td>`;

                $('#add-row').dataTable().fnAddData([
                    title.title,
                    action
                ]);
            })
        })
        .catch((error) => {
            console.log(error);
        });
}

async function createGenreToDB(name) {
    try {
        const response = await axios.post(`http://localhost:3000/api/v1/genres`, {
            name: name
        })
        const data = response.data
        return data
    } catch (error) {
        return error.response.data
    }
}

async function addCategory() {

    var action = `<td><div class="form-button-action"><a role="button" class="btn btn-link btn-primary btn-lg detail-button" href="#detail"><i class="fas fa-info-circle"></i></a></div></td>`;

    $('#addRowButton').click(async function () {

        var name = $("#addName").val()
        const response = await createGenreToDB(name)
        console.log(response)

        if (response.status == "fail") {

            showFlashMessage(response.message, "danger")
        } else {

            $('#add-row').dataTable().fnAddData([
                name,
                action
            ]);

            showFlashMessage("Thêm chuyên mục mới thành công", "success")
        }
        $('#addRowModal').modal('hide');

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

$(document).on('click', '.detail-button', function () {
    var id_music = this.parentElement.id
    var name_category = this.parentElement.parentElement.parentElement.children[0].innerText

    console.log(id_music)
    $("#name_category").text(name_category)

    axios
        .get(`http://localhost:3000/api/v1/songs/genre?genreId=${id_music}&sort=-listen&limit=50`)
        .then((response) => {
            const data = response.data.data
            console.log(data)

            const allMusic = data.map(function (music) {
                return {
                    title: music.title,
                    mainArtist: music.mainArtist,
                    thumbnail: music.thumbnail,
                    listen: music.listen,
                    like: music.like
                }
            })

            // Delete old data
            $('#music-table').dataTable().fnClearTable()

            allMusic.forEach(function (music) {
                var thumbnail_image = `<img style="max-width: 120px; max-height: 120px;"src="${music.thumbnail}" alt="${music.thumbnail}">`
                // console.log(thumbnail_image)
                $('#music-table').dataTable().fnAddData([
                    music.title,
                    thumbnail_image,
                    music.mainArtist,
                    music.listen,
                    music.like
                ]);
            })
        })
        .catch((error) => {
            console.log(error);
        });

});