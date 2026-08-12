const searchInput = document.getElementById('search');
const output = document.getElementById('users');
let allUsers = [];

async function loadUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        
        allUsers = await response.json();
        showUsers(allUsers);
        
    } catch (error) {
        output.innerHTML = `<p>${error.message}</p>`;
    }
}

function showUsers(users) {
    let htmlData = '';
    
    users.forEach(u => {
        htmlData += `
        <div class="card">
            <h3>${u.name}</h3>
            <p>${u.email}</p>
            <p>${u.phone}</p>
            <p>${u.address.city}</p>
            <p>${u.website}</p>
        </div>
        `;
    });
    
    output.innerHTML = htmlData;
}

searchInput.addEventListener('input', () => {
    const searchValue = searchInput.value.toLowerCase();
    
    const filteredUsers = allUsers.filter(u => {
        return u.name.toLowerCase().includes(searchValue);
    });
    
    showUsers(filteredUsers);
});

loadUsers();