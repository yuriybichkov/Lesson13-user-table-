(async () => {

    async function getUsers() {
        const responce = await axios.get('https://jsonplaceholder.typicode.com/users');
        return responce.data;
    }

    let users = await getUsers();

    //using for..Of
    /* function render() {
         const tableBody = document.getElementById('user-tbody');
         let dataHtml ='';
         for(let person of users){
             dataHtml+= `<tr id="${person.id}">
                 <td>${person.name}</td>
                 <td>${person.username}</td>
                 <td>${person.email}</td>
                 <td>${person.website}</td>
                 </tr>`;
             tableBody.innerHTML = dataHtml;
         }
     }*/

    //using reduce
    function render(users) {
        let nameArr = document.getElementById('user-tbody');
        nameArr.innerHTML = users.reduce((html, user) =>
            html + `<tr id="${user.id}">
                        <td>${user.name}</td>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.website}</td>
                        </tr>`, '');
    }

    render(users);

    document.querySelector('thead')
        .addEventListener('click', evt => {
            const tag = evt.target;
            console.log(tag);
            if (tag.classList.contains('table-head')) {
                const dataName = tag.getAttribute('data-name');
                users = users.sort((a, b) => {
                    if (a[dataName] > b[dataName]) {
                        return 1;
                    } else if (a[dataName] < b[dataName]) {
                        return -1;
                    }
                    return 0;
                });
                render(users);
            }
        });

    const modal = document.getElementById('myModal');
    const closeBtn = document.getElementById('close');
    console.log(modal);


    document.querySelector('tbody')
        .addEventListener('click', evt => {
            let div = document.createElement('div');
            modCont.appendChild(div);
            div.setAttribute('id', 'dataMod');

            const dId = parseFloat(evt.target.parentNode.getAttribute('id'));
            for (let keyObj of users) {
                if (keyObj.id === dId) {
                    for (let key in keyObj) {
                        div.innerHTML +=`${key}: ${keyObj[key]};<br>`;
                    }
                    modal.style.display = "block";
                }
            }
        });


    closeBtn.onclick = function () {
        modCont.removeChild(dataMod);
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modCont.removeChild(dataMod);
            modal.style.display = "none";
        }
    };


})();