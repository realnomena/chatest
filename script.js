document.addEventListener('DOMContentLoaded', function() {
    const createRoomBtn = document.getElementById('createRoomBtn');
    const joinRoomBtn = document.getElementById('joinRoomBtn');
    const logoutContainer = document.getElementById('logoutContainer');
    const logoutBtn = document.getElementById('logoutBtn');

    // Check if user is logged in and show logout button
    if (localStorage.getItem('token')) {
        logoutContainer.style.display = 'block';
    }

    // Add logout functionality
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('token');
        localStorage.removeItem('currentRoomCode');
        window.location.href = 'login.html';
    });

    createRoomBtn.addEventListener('click', function() {
        if (!localStorage.getItem('token')) {
            window.location.href = 'login.html';
        } else {
            const roomCode = generateRoomCode();
            // Store room code in active rooms
            const activeRooms = JSON.parse(localStorage.getItem('activeRooms') || '[]');
            activeRooms.push(roomCode);
            localStorage.setItem('activeRooms', JSON.stringify(activeRooms));
            
            // Create message array for this room
            localStorage.setItem(`messages_${roomCode}`, JSON.stringify([]));
            // Set current room code for the creator
            localStorage.setItem('currentRoomCode', roomCode);
            window.location.href = 'chat.html';
        }
    });

    joinRoomBtn.addEventListener('click', function() {
        if (!localStorage.getItem('token')) {
            window.location.href = 'login.html';
        } else {
            const roomCode = prompt('Please enter the room code:');
            if (roomCode) {
                // Check if room exists in active rooms
                const activeRooms = JSON.parse(localStorage.getItem('activeRooms') || '[]');
                if (activeRooms.includes(roomCode)) {
                    // Set current room code for the joiner
                    localStorage.setItem('currentRoomCode', roomCode);
                    window.location.href = 'chat.html';
                } else {
                    alert('Invalid room code. Please try again.');
                }
            }
        }
    });

    function generateRoomCode() {
        return 'room-' + Math.random().toString(36).substr(2, 9);
    }
});