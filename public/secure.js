fetch('/api/secure', {
    method: 'GET',
    headers: {
        'auth-token': localStorage.getItem('auth-token')
    }

    
});

// when we signup with a different id it takes us to batcave
