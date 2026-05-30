// API Connection Test Utility
export const testApiConnection = async () => {
  try {
    const response = await fetch('http://localhost:4242/api/auth/test', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      console.log('✅ Backend API is running');
      return true;
    } else {
      console.log('❌ Backend API returned error:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Backend API connection failed:', error.message);
    return false;
  }
};

// Test login endpoint specifically
export const testLoginEndpoint = async () => {
  try {
    const response = await fetch('http://localhost:4242/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'test@test.com', password: 'test' }),
    });
    
    const data = await response.json();
    console.log('Login endpoint test response:', data);
    return true;
  } catch (error) {
    console.log('❌ Login endpoint test failed:', error.message);
    return false;
  }
};

