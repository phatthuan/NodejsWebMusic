$(document).ready(function () {

    // Check login
    confirmLogin()

    // Add Row
    $('#add-row').DataTable({
        "pageLength": 5,
    });

    showAllTopMusic()
});

async function confirmLogin(){
    if(localStorage.getItem('user')){
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

function showAllTopMusic() {
    // var action = '<td><div class="form-button-action"><button type="button" data-toggle="tooltip" title=""class="btn btn-link btn-primary btn-lg"data-original-title="Edit Task"><i class="fa fa-edit"></i></button><button type="button"class="btn btn-link btn-danger remove-button"data-original-title="Remove Task" data-toggle="modal"data-target="#deleteRowModal"><i class="fa fa-times"></i></button></div></td>';

    axios
        .get("http://localhost:3000/api/v1/songs/top10")
        .then((response) => {
            const data = response.data.data
            
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
            var top = 0
            allMusic.forEach(function (music) {
                var thumbnail_image = `<img style="max-width: 120px; max-height: 120px;"src="${music.thumbnail}" alt="${music.thumbnail}">`
                // console.log(thumbnail_image)
                top += 1
                $('#add-row').dataTable().fnAddData([
                    top,
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
}