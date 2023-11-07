$(document).ready(function () {

    // Check login
    confirmLogin()

    // Add Row
    $('#add-row').DataTable({
        "pageLength": 5,
    });

    showAllComment()
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

async function showAllComment() {
    const allComment = await getAllComment()
    console.log(allComment)

    // Access each song
    allComment.forEach(function (music) {

        // Get all comment from this song
        music.allCommentFromUser.forEach(function (comment) {

            var action = `<td>
                        <div class="form-button-action">
                            <button type="button"class="btn btn-link btn-danger remove-button"
                                data-original-title="Remove Task" data-toggle="modal"
                                data-target="#deleteRowModal">
                                <i class="fa fa-times"></i>
                            </button>
                        </div>
                        <div id="${music.songId}">
                        </div>
                        <div id="${comment.reviewId}">
                        </div>
                    </td>`

            $('#add-row').dataTable().fnAddData([
                comment.account_name,
                music.song_name,
                comment.comment,
                comment.createdAt,
                action
            ]);
        })

    })
}

async function getAllComment() {
    const allMusic = await getAllMusic()
    console.log(allMusic)

    const allCommentPromises = allMusic.map(async function (music) {
        const comment = await getCommentByID(music.id)
        // console.log(comment)
        if (comment.data[0]) {

            var detail_comment = []
            comment.data.forEach(function (element) {
                detail_comment.push({
                    account_name: element.account.name,
                    comment: element.review,
                    createdAt: element.createdAt.split('T')[0],
                    reviewId: element._id,
                })
            })

            // console.log(detail_comment)

            return {
                song_name: music.title,
                songId: music.id,
                allCommentFromUser: detail_comment
            }
        }
    })

    const allComment = await Promise.all(allCommentPromises)
        .then((comments) => comments.filter((comment) => comment !== undefined))

    return allComment

}

async function getAllMusic() {
    try {
        const response = await axios.get("http://localhost:3000/api/v1/songs?sort=+listen&limit=100")
        const data = response.data.data.data
        const allMusicID = data.map(function (music) {
            return {
                id: music._id,
                title: music.title
            }
        })
        return allMusicID
    } catch (error) {
        console.log(error)
        return
    }
}

async function getCommentByID(id) {
    try {
        const response = await axios.get(`http://localhost:3000/api/v1/songs/${id}/reviews`)
        const data = response.data
        return data
    } catch (error) {
        console.log(error)
        return
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

async function deleteCommentToDB(songId, reviewId) {
    console.log("review" + reviewId)
    try {
        const response = await axios.delete(`http://localhost:3000/api/v1/songs/${songId}/reviews`, {
            data: {
                reviewId: reviewId
            }
        });
        const data = response.data
        return data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

$(document).on('click', '.remove-button', function () {
    var row_delete = this.parentElement.parentElement.parentElement
    var name = this.parentElement.parentElement.parentElement.children[0].innerText
    var songId = this.parentElement.parentElement.children[1].id
    var reviewId = this.parentElement.parentElement.children[2].id

    console.log(row_delete)

    $("#confirm_name").text(name)

    $('#deleteRowButton').off('click').on('click', async function () {

        const response = await deleteCommentToDB(songId, reviewId)

        if (response.status == "fail") {
            showFlashMessage(response.message, "danger")
        } else {
            $('#add-row').dataTable().fnDeleteRow(row_delete);
            showFlashMessage("Xóa bình luận người dùng " + name + " thành công", "success")
        }

        $('#deleteRowModal').modal('hide');

    });

});