const ws = new WebSocket('ws://localhost:2300');

ws.onopen = () => {
    console.log('Connected to WebSocket server');

    // Register user
    ws.send(JSON.stringify({
        
        userId: '67e8728a5f8b344a46f42b15',
        name: 'Appartment',
        price: "50000"
    }));

    // Check for matching users
    ws.send(JSON.stringify({ type: 'findMatchingUsers' }));
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === 'ipMatch') {
        alert('Matching User Found: ' + JSON.stringify(data.users, null, 2));
    }
};


// ws.onopen = () => {
//     console.log('Connected to WebSocket server');
    
//     ws.send(
//       JSON.stringify({
//         token: 'your_jwt_token',
//         senderId: 'user1_id',
//         receiverId: 'user2_id',
//         text: 'Hello!',
//       })
//     );
//   };
  
//   ws.onmessage = (event) => {
//     const message = JSON.parse(event.data);
//     console.log('New message:', message);
//   };
  
//   ws.onclose = () => {
//     console.log('WebSocket disconnected');
//   };