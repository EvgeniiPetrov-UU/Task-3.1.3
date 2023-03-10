const data = document.getElementById("data-user");
const url = 'api/user';

fetch(url)
    .then(res => res.json())
    .then(u => {
        let temp = '';
        temp += `<tr>
            <td>${u.id}</td>
            <td>${u.firstName}</td>
            <td>${u.lastName}</td>
            <td>${u.name}</td>
            <td>${u.roles.map(role => role.name.replaceAll("ROLE_", "")).join(' ')}</td> 
            </tr>`;
        data.innerHTML = temp;
    });