<script>
    import { goto } from '$app/navigation';
  
    let username = '';
    let password = '';
    let errorMessage = '';
    let isSubmitting = false;
  
    async function sendData() {
      try {
        const response = await fetch("/api/login", {
  method: "POST", 
  body: JSON.stringify({
    username: username,
    password: password,
  }),
  headers: {
    'Content-Type': 'application/json'
  }
});

        const data = await response.json();

// Handle login success or failure
if (response.ok && data.success) {
  alert('Login successful!');
  // Optionally store user data or token in localStorage/sessionStorage
  localStorage.setItem('user', JSON.stringify(data.user)); // Store user data
  goto('/home'); // Redirect to dashboard after login
} else {
  errorMessage = data.message || 'Invalid credentials!';
}
} catch (error) {
errorMessage = 'Something went wrong. Please try again.';
} finally {
isSubmitting = false;
}
}
  
const handleSubmit = () => {
    errorMessage = '';
    
    // Simple validation
    if (!username || !password) {
      errorMessage = 'Both fields are required.';
      return;
    }

    isSubmitting = true;
    sendData(); // Call sendData to handle the API request
  };

  const goToRegister = () => {
    goto('/Register');
  };

  </script>
  
  <div id="login-container">
    <div class="p-5">
      <h3>Login</h3>
      <h5>Welcome Back</h5>
      <p>Please enter your username and password</p>
      <div>
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter your "
          bind:value={username}
        />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          bind:value={password}
        />
      </div>
      {#if errorMessage}
        <div class="error-message">{errorMessage}</div>
      {/if}
      <button
        class="btn"
        on:click={handleSubmit}
        disabled={isSubmitting}
      >
        {#if isSubmitting}
          <span class="loading">Logging in...</span>
        {:else}
          Login
        {/if}
      </button>
  
      <p class="text-muted">
        Don't have an account? 
        <button id="register-route" on:click={goToRegister}>
          Register
        </button>
      </p>
    </div>
  </div>
  
      

<style>
  
    h3 {
        color: #e91e63;
        text-align: center;
        font-weight: bold;
        font-style: italic;
    }

    h5 {
        color: black;
        font-size: 2rem;
        text-align: center;
        margin-bottom: 10px;
        font-weight: bold;
    }

    p {
        color: black;
        letter-spacing: 1px;
        text-align: center;
        font-size: 0.9rem;
        margin-top: 10px;
    }

    .p-5 {
        backdrop-filter: blur(15px);
        background: rgba(255, 255, 255, 0.2);
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-radius: 15px;
        padding: 30px;
        margin: auto;
        width: 100%;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    }

    .btn {
        background-color: #e91e63;
        color: white;
        width: 100%;
        margin-top: 15px;
        padding: 10px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .btn:hover {
        background-color: #ff4081;
    }

    #login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin-top: 80px;
    }

    input[type="text"], input[type="password"] {
        width: 100%;
        padding: 10px;
        margin-top: 5px;
        margin-bottom: 15px;
        border: 2px solid #e91e63;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.5);
        color: black;
    }

    input::placeholder {
        color: black;
    }

    label {
        display: block;
        text-align: left;
        margin-top: 10px;
        color: black;
    }

    #register-route {
        background: none;
        border: none;
        color: #e91e63;
        cursor: pointer;
        text-decoration: underline;
    }

    .error-message {
        color: red;
        margin-bottom: 15px;
    }
</style>
