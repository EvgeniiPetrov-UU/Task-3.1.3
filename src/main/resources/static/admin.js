const requestUrlPrefix = 'api/admin';

// All users

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

// Add user

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
        .then(() => {
            createTable();
            document.getElementById("users-table-tab").click();
        })
    document.getElementById('newUserFirstName').value = '';
    document.getElementById('newUserLastName').value = '';
    document.getElementById('newUserEmail').value = '';
    document.getElementById('newUserPassword').value = '';
})

// Show and fill delete modal

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

// Delete user

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
            createTable();
            document.getElementById("closeDeleteModal").click();
        })
}

// Show and fill edit modal

const editUserForm = document.getElementById("edit-user-form")

async function editModal(id) {
    fetch(requestUrlPrefix + '/' + id)
        .then(res => {
            res.json()
                .then(async user => {
                    console.log(user);
                    document.getElementById('idEdit').value = user.id;
                    document.getElementById('editUserFirstName').value = user.firstName;
                    document.getElementById('editUserFirstName').value = user.lastName;
                    document.getElementById('editUserEmail').value = user.name;
                    document.getElementById('editUserPassword').value = user.password;
                    new bootstrap.Modal(document.getElementById('#editModal')).show();
                })
        })
}

// Edit user

editUserForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let idValue = document.getElementById("idEdit").value;
    let firstNameValue = document.getElementById('editUserFirstName').value;
    let lastNameValue = document.getElementById('editUserFirstName').value;
    let emailValue = document.getElementById('editUserEmail').value;
    let passwordValue = document.getElementById('editUserPassword').value;
    let rolesValue = getRoles(Array.from(document.getElementById('editUserRoles').selectedOptions)
        .map(role => role.value));

    await fetch(requestUrlPrefix + '/updateUser/' + idValue, {
        method: "PATCH",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            id: idValue,
            firstName: firstNameValue,
            lastName: lastNameValue,
            name: emailValue,
            password: passwordValue,
            roles: rolesValue,
        })
    })
        .then(() => {
            createTable();
            document.getElementById("closeEditModal").click();
        })
})