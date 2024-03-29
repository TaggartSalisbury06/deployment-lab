const addForm = document.querySelector('form');
const nameInput = document.querySelector('input');
const container = document.querySelector('section');

function putTheThingInTheView(res) {
    container.innerHTML = ''
    nameInput.value = ''

    res.data.forEach((cityName, index) => {
        container.innerHTML += `<p name=${index}>${cityName}</p>`
    })

    document.querySelectorAll('p').forEach(element => {
        const theIndexValue = element.getAttribute('name');

        element.addEventListener('click', () => {
            axios
                .delete(`/api/cities/${theIndexValue}`)
                .then(res => {
                    putTheThingInTheView(res)
                })
        })
    })
}

function submitHandler(evt) {
    evt.preventDefault();

    axios
        .post('/api/cities', { name: nameInput.value })
        .then(res => {
            putTheThingInTheView(res)
        })
        .catch(err => {
            nameInput.value = ''

            const notif = document.createElement('aside')
            notif.innerHTML = `<p>${err.response.data}</p>
            <button class="close">close</button>`
            document.body.appendChild(notif)

            document.querySelectorAll('.close').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.target.parentNode.remove()
                })
            })
        })
}

// get student list on initial load
axios
    .get('/api/cities')
    .then(res => {
        putTheThingInTheView(res)
    })

addForm.addEventListener('submit', submitHandler)