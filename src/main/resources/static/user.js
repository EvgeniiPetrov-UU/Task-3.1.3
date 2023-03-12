const data = document.getElementById("data-user");
const panel = document.getElementById("user-info");
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
            <td><span>${u.roles.map(role => role.name.replaceAll("ROLE_", "")).join(' ')}</span></td> 
            </tr>`;
        data.innerHTML = temp;
        panel.innerHTML = `<span>${u.name} with roles: ${u.roles.map(role =>
            role.name.replaceAll("ROLE_", "")).join(' ')}</span>`
    })
