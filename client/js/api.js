const API_URL = 'http://localhost:5000/api';
const socket = io('http://localhost:5000');

async function loginUser(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    return response.json();
}

async function createRoom() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/rooms`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token
        }
    });
    return response.json();
}

// Add more API functions as needed