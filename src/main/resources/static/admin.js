const requestUrlPrefix = 'api/admin';

function createTable(users) {
    let temp = "";
    users.forEach(user => {
        console.log(user)
        temp += `
            <tr>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.username}</td>
                <td><span>${user.roles.map(role => role.name.replaceAll("ROLE_", "")).join(' ')}</span></td>
                <td>
                    <button class="btn btn-info" data-bs-target="#modalEdit" data-bs-toggle="modal"
                    th:data-bs-target="${'#modalEdit'+user.id}"
                    type="button">Edit
                    </button>
                </td>
                <td>
                    <button class="btn btn-danger" data-bs-target="#modalDelete" data-bs-toggle="modal"
                    th:data-bs-target="${'#modalDelete'+user.id}"
                    type="button">Delete
                    </button>
                </td>
            </tr>
        `;
    })
    document.getElementById("usersTableBody").innerHTML = temp;
}

fetch(requestUrlPrefix + '/users').then(
    res => {
        res.json().then(
            data => {
                createTable(data);
            }
        )
    }
)

// fetch(requestUrlPrefix + '/roles').then(
//     res => {
//         res.json().then(
//             roles => {
//                 allRoles = roles;
//             }
//         )
//     }
// )

// fetch(requestUrlPrefix + '/roles').then(
//     res => {
//         res.json().then(
//             roles => {
//                 let temp = "";
//                 console.log(roles)
//                 document.getElementById("rolesNew").size = roles.length;
//                 roles.forEach(r => {
//                     temp += "<option>" + r.name + "</option>";
//                 })
//                 document.getElementById("rolesNew").innerHTML = temp;
//             }
//         )
//     }
// );

// $('#addUserBtn').click(function () {
//     let newUser = {
//         firstName: "",
//         lastName: "",
//         name: "",
//         password: "",
//         roles: []
//     };
//     newUser.firstName = document.getElementById("nameNew").value;
//     newUser.lastName = document.getElementById("lastNameNew").value;
//     newUser.name = document.getElementById("emailNew").value;
//     newUser.password = document.getElementById("passwordNew").value;
//     newUser.roles = [];
//     [].slice.call(document.getElementById("rolesNew")).forEach(op => {
//         if (op.selected) {
//             allRoles.forEach(r => {
//                 if (r.role == op.text) {
//                     newUser.roles.push(r);
//                 }
//             })
//         }
//     })
//     fetch(requestUrlPrefix + '/saveUser', {
//         method: 'POST',
//         body: JSON.stringify(newUser),
//         headers: {'Content-Type': 'application/json'}
//     }).then(res1 => {
//         if (res1.ok) {
//             res1.json().then(u => {
//                 data.push(u);
//                 createTable(data);
//             })
//             document.getElementById("nameNew").value = "";
//             document.getElementById("lastNameNew").value = "";
//             document.getElementById("emailNew").value = "";
//             document.getElementById("passwordNew").value = "";
//             document.getElementById("rolesNew").selectedIndex = -1;
//         } else {
//             alert("Не удалось добавить: " + res1.status);
//         }
//     })
// })

//Create new user, save it in DB and add the row in the "All Users" table after button "Add new user" pressed in "New user" tab
document.getElementById('createUserForm').addEventListener('submit', (event) => {
    event.preventDefault();
    //Gather new user info into object
    const newUserRoles = [];
    if (document.getElementById('newRoleUser').selected) newUserRoles.push({id: 2, name: 'ROLE_USER'});
    if (document.getElementById('newRoleAdmin').selected) newUserRoles.push({id: 1, name: 'ROLE_ADMIN'});
    const newUser = {
        firstName: document.getElementById('newUserFirstName').value,
        lastName: document.getElementById('newUserLastName').value,
        username: document.getElementById('newUserEmail').value,
        password: document.getElementById('newUserPassword').value,
        roles: [newUserRoles]
    };
    fetch(requestUrlPrefix + '/saveUser', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
    }).then(res => {
        res.json().then(u => {
            data.push(u);
            createTable(data);
        })
    });
    //Clear form values
    document.getElementById('newUserFirstName').value = '';
    document.getElementById('newUserLastName').value = '';
    document.getElementById('newUserEmail').value = '';
    document.getElementById('newUserPassword').value = '';
    document.getElementById('newRoleUser').selected = true;
    document.getElementById('newRoleAdmin').selected = false;
});

const renderEditModalFormContent = (user) => {
    document.getElementById('editForm').innerHTML = `
        <label for="idEdit">ID
            <input class="form-control" disabled 
            id="idEdit" th:name="id"
            th:type="number" th:value="${user.id}">
        </label>
        <label for="editUserFirstName">First name
            <input class="form-control" id="editUserFirstName"
            placeholder="First name" required
            th:name="firstName"
            th:type="text" th:value="${user.firstName}">      
        </label>                                                     
        <label for="editUserLastName">Last name
            <input class="form-control" id="editUserLastName"
            placeholder="Last name" required
            th:name="lastName"
            th:type="text" th:value="${user.lastName}">
        </label>
        <label for="editUserEmail">Email
            <input class="form-control" id="editUserEmail" placeholder="Email"
            required th:name="name"
            th:type="email" th:value="${user.name}">
        </label>
        <label for="editUserPassword">Password
            <input class="form-control" id="editUserPassword" placeholder="Password" required
            th:name="password"
            th:type="password" th:value="${user.password}">
        </label>
        <label class="container-fluid col-6" for="editUserRoles">Role
            <select class="form-select" id="editUserRoles" multiple name="roles" size="2">
                <option id="optionAdmin">ADMIN</option>
                <option id="optionUser">USER</option>
            </select>
        </label>                                                    
    `;
    user.roles.forEach(role => {
        if (role.id === 1) document.getElementById('optionUser').selected = true;
        if (role.id === 2) document.getElementById('optionAdmin').selected = true;
    });
};

const renderDeleteModalContent = (user) => {
    let content = `
        <label for="idDeleteUser">
            <strong>ID</strong>
                <input class="form-control" disabled
                id="idDeleteUser" th:name="id"
                th:type="number"
                th:value="${user.id}">
        </label>
        <label for="deleteUserFirstName">
            <strong>First name</strong>
                <input class="form-control" disabled
                    th:name="firstName" 
                    th:type="text" 
                    th:value="${user.firstName}">
        </label>
        <label for="deleteUserLastName">
            <strong>Last name</strong>
                <input class="form-control" disabled 
                id="deleteUserLastName" 
                th:name="lastName" 
                th:type="text" 
                th:value="${user.lastName}">
        </label>
        <label for="deleteUserEmail">
            <strong>Email</strong>
                <input class="form-control" disabled 
                id="deleteUserEmail" 
                th:name="name" 
                th:type="email" 
                th:value="${user.name}">
        </label>
        <label class="container-fluid col-6" for="deleteUserRoles">
            <strong>Role</strong>
                <select class="form-select" disabled id="deleteUserRoles" multiple name="roles" size="2">
    `;
    user.roles.forEach(role => {
        const authority = role.name;
        content += `
            <option label="${authority.substring(authority.lastIndexOf('_') + 1)}"></option>
        `;
    });
    content += `
        </select>
        </label>
    `;
    document.getElementById('deleteModalContent').innerHTML = content;
};

//Show the Edit modal window
document.getElementById('editModal').addEventListener('show.bs.modal', (event) => {
    const userId = event.relatedTarget.getAttribute('data-bs-userId');
    // Fill the form of Edit modal with user data
    sendRequest('GET', '/admin/' + userId).then(user => renderEditModalFormContent(user));
});

//Update the user in the DB and update the corresponding row of the "All Users" table after button EDIT pressed in Edit modal
document.getElementById('editForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const userRolesEdited = [];
    if (document.getElementById('optionUser').selected) userRolesEdited.push({id: 1, authority: 'ROLE_USER'});
    if (document.getElementById('optionAdmin').selected) userRolesEdited.push({id: 2, authority: 'ROLE_ADMIN'});
    const userEdited = {
        id: document.getElementById('idEdit').value,
        firstName: document.getElementById('firstNameEdit').value,
        lastName: document.getElementById('lastNameEdit').value,
        age: document.getElementById('ageEdit').value,
        username: document.getElementById('usernameEdit').value,
        password: document.getElementById('passwordEdit').value,
        roles: userRolesEdited
    };
    sendRequest('PUT', '/admin', userEdited).then(user => {
        if (user) allUsersTableRowUpdate(user)
    });
    document.getElementById('buttonCloseModal').click();
});

//Show the Delete modal window
document.getElementById('deleteModal').addEventListener('show.bs.modal', (event) => {
    const userId = event.relatedTarget.getAttribute('data-bs-userId');
    // Fill the content of Delete modal with user data
    sendRequest('GET', '/admin/' + userId).then(user => renderDeleteModalContent(user));
});

//Delete the user from the DB and delete the corresponding row of the "All Users" table after button DELETE pressed in Delete modal
document.getElementById('deleteForm').addEventListener('submit', (event) => {
    event.preventDefault();
    sendRequest('DELETE', '/admin/' + document.getElementById('deleteUserId').value).then(id => allUsersTableRowDelete(id));
});

// function sendRequest(method, url, body = null) {
//     const options = {
//         method: method,
//         body: JSON.stringify(body),
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };
//
//     return fetch(requestUrlPrefix + url, method === 'GET' ? null : options).then(response => {
//         if (!response.ok) {
//             response.status === 409 ? showAlert('Data not saved!\nUser with this email already exists in the database!') :
//                 showAlert('Something went wrong')
//             throw new Error('Server response: ' + response.status);
//         }
//         return response.json();
//     });
// }
//
// function showAlert(message) {
//     const alert = document.createElement('div');
//     alert.className = 'alert alert-danger alert-dismissible role="alert" fade show';
//     alert.innerHTML = `<div class="fs-5">${message}</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
//     messages.appendChild(alert);
// }