const requestUrlPrefix = 'api/admin';

function createTable() {
    fetch(requestUrlPrefix + '/users')
        .then(res => {res.json()
            .then(users => {
                let temp = "";
                users.forEach(user => {
                    console.log(user)
                    temp += `
                            <tr>
                                <td>${user.id}</td>
                                <td>${user.firstName}</td>
                                <td>${user.lastName}</td>
                                <td>${user.name}</td>
                                <td>
                                    <span>${user.roles.map(role => role.name.replaceAll("ROLE_", "")).join(' ')}</span>
                                </td>
                                <td>
                                    <button class="btn btn-info" data-bs-target="#editModal" data-bs-toggle="modal"
                                    onclick="editModal(${user.id})" type="button">Edit
                                    </button>
                                </td>
                                <td>
                                    <button class="btn btn-danger" data-bs-target="#deleteModal" data-bs-toggle="modal"
                                    onclick="deleteModal(${user.id})" type="button">Delete
                                    </button>
                                </td>
                            </tr>
                            `;
                })
                document.getElementById("usersTableBody").innerHTML = temp;
            })
        })
}

createTable()

const addUserForm = document.getElementById("add-user-form")

function getRoles(selectedRoles) {
    let roles = [];
    if (selectedRoles.indexOf("ADMIN") >= 0) {
        roles.push({"id": 1});
    }
    if (selectedRoles.indexOf("USER") >= 0) {
        roles.push({"id": 2});
    }
    return roles;
}

addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstNameValue = document.getElementById('newUserFirstName').value;
    let lastNameValue = document.getElementById('newUserLastName').value;
    let emailValue = document.getElementById('newUserEmail').value;
    let passwordValue = document.getElementById('newUserPassword').value;
    let rolesValue = getRoles(Array.from(document.getElementById('newUserRoles').selectedOptions)
        .map(role => role.value));

    fetch(requestUrlPrefix + '/saveUser', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            firstName: firstNameValue,
            lastName: lastNameValue,
            name: emailValue,
            password: passwordValue,
            roles: rolesValue,
        })
    })
        .then(user => {
            const usersArr = [];
            usersArr.push(user);
            createTable(usersArr);
        })
        .then(() => {
            document.getElementById("users-table-tab").click();
        })
    document.getElementById('newUserFirstName').value = '';
    document.getElementById('newUserLastName').value = '';
    document.getElementById('newUserEmail').value = '';
    document.getElementById('newUserPassword').value = '';
})

function deleteModal(id) {
    fetch(requestUrlPrefix + '/' + id, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(res => {
        res.json()
            .then(user => {
                document.getElementById('idDeleteUser').value = user.id;
                document.getElementById('deleteUserFirstName').value = user.firstName;
                document.getElementById('deleteUserLastName').value = user.lastName;
                document.getElementById('deleteUserEmail').value = user.name;
                document.getElementById('deleteUserRoles').value = user.roles.map(r => r.name).join(" ");
                new bootstrap.Modal(document.getElementById('#deleteModal')).show();
            })
    })
}

async function deleteUser() {
    await fetch(requestUrlPrefix + '/deleteUser/' + document.getElementById('idDeleteUser').value, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(document.getElementById('idDeleteUser').value)
    })
        .then(() => {
            // document.getElementById("nav-admin-tab").click();
            createTable();
            document.getElementById("closeDeleteModal").click();
        })
}

// const renderEditModalFormContent = (user) => {
//     document.getElementById('editForm').innerHTML = `
//         <label for="idEdit">ID
//             <input class="form-control" disabled
//             id="idEdit" th:name="id"
//             th:type="number" th:value="${user.id}">
//         </label>
//         <label for="editUserFirstName">First name
//             <input class="form-control" id="editUserFirstName"
//             placeholder="First name" required
//             th:name="firstName"
//             th:type="text" th:value="${user.firstName}">
//         </label>
//         <label for="editUserLastName">Last name
//             <input class="form-control" id="editUserLastName"
//             placeholder="Last name" required
//             th:name="lastName"
//             th:type="text" th:value="${user.lastName}">
//         </label>
//         <label for="editUserEmail">Email
//             <input class="form-control" id="editUserEmail" placeholder="Email"
//             required th:name="name"
//             th:type="email" th:value="${user.name}">
//         </label>
//         <label for="editUserPassword">Password
//             <input class="form-control" id="editUserPassword" placeholder="Password" required
//             th:name="password"
//             th:type="password" th:value="${user.password}">
//         </label>
//         <label class="container-fluid col-6" for="editUserRoles">Role
//             <select class="form-select" id="editUserRoles" multiple name="roles" size="2">
//                 <option id="optionAdmin">ADMIN</option>
//                 <option id="optionUser">USER</option>
//             </select>
//         </label>
//     `;
//     user.roles.forEach(role => {
//         if (role.id === 1) document.getElementById('optionUser').selected = true;
//         if (role.id === 2) document.getElementById('optionAdmin').selected = true;
//     });
// };
//
// const renderDeleteModalContent = (user) => {
//     let content = `
//         <label for="idDeleteUser">
//             <strong>ID</strong>
//                 <input class="form-control" disabled
//                 id="idDeleteUser" th:name="id"
//                 th:type="number"
//                 th:value="${user.id}">
//         </label>
//         <label for="deleteUserFirstName">
//             <strong>First name</strong>
//                 <input class="form-control" disabled
//                     th:name="firstName"
//                     th:type="text"
//                     th:value="${user.firstName}">
//         </label>
//         <label for="deleteUserLastName">
//             <strong>Last name</strong>
//                 <input class="form-control" disabled
//                 id="deleteUserLastName"
//                 th:name="lastName"
//                 th:type="text"
//                 th:value="${user.lastName}">
//         </label>
//         <label for="deleteUserEmail">
//             <strong>Email</strong>
//                 <input class="form-control" disabled
//                 id="deleteUserEmail"
//                 th:name="name"
//                 th:type="email"
//                 th:value="${user.name}">
//         </label>
//         <label class="container-fluid col-6" for="deleteUserRoles">
//             <strong>Role</strong>
//                 <select class="form-select" disabled id="deleteUserRoles" multiple name="roles" size="2">
//     `;
//     user.roles.forEach(role => {
//         const authority = role.name;
//         content += `
//             <option label="${authority.substring(authority.lastIndexOf('_') + 1)}"></option>
//         `;
//     });
//     content += `
//         </select>
//         </label>
//     `;
//     document.getElementById('deleteModalContent').innerHTML = content;
// };
//
// //Show the Edit modal window
// document.getElementById('editModal').addEventListener('show.bs.modal', (event) => {
//     const userId = event.relatedTarget.getAttribute('data-bs-userId');
//     // Fill the form of Edit modal with user data
//     sendRequest('GET', '/admin/' + userId).then(user => renderEditModalFormContent(user));
// });
//
// //Update the user in the DB and update the corresponding row of the "All Users" table after button EDIT pressed in Edit modal
// document.getElementById('editForm').addEventListener('submit', (event) => {
//     event.preventDefault();
//     const userRolesEdited = [];
//     if (document.getElementById('optionUser').selected) userRolesEdited.push({id: 1, authority: 'ROLE_USER'});
//     if (document.getElementById('optionAdmin').selected) userRolesEdited.push({id: 2, authority: 'ROLE_ADMIN'});
//     const userEdited = {
//         id: document.getElementById('idEdit').value,
//         firstName: document.getElementById('firstNameEdit').value,
//         lastName: document.getElementById('lastNameEdit').value,
//         age: document.getElementById('ageEdit').value,
//         username: document.getElementById('usernameEdit').value,
//         password: document.getElementById('passwordEdit').value,
//         roles: userRolesEdited
//     };
//     sendRequest('PUT', '/admin', userEdited).then(user => {
//         if (user) allUsersTableRowUpdate(user)
//     });
//     document.getElementById('buttonCloseModal').click();
// });
//
// //Show the Delete modal window
// document.getElementById('deleteModal').addEventListener('show.bs.modal', (event) => {
//     const userId = event.relatedTarget.getAttribute('data-bs-userId');
//     // Fill the content of Delete modal with user data
//     sendRequest('GET', '/admin/' + userId).then(user => renderDeleteModalContent(user));
// });
//
// //Delete the user from the DB and delete the corresponding row of the "All Users" table after button DELETE pressed in Delete modal
// document.getElementById('deleteForm').addEventListener('submit', (event) => {
//     event.preventDefault();
//     sendRequest('DELETE', '/admin/' + document.getElementById('deleteUserId').value).then(id => allUsersTableRowDelete(id));
// });

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