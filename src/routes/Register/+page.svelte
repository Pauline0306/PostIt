<script>
    let user_fullname = '';
    let user_email = '';
    let password = '';
    let errorMessage = '';

    const onSubmit = () => {
        errorMessage = '';
        if (!user_fullname || !user_email || !password) {
            errorMessage = 'All fields are required.';
            return;
        }
        alert('Registration Successful!');
        // Redirect to login or home
        window.location.href = '/Login';
    };
</script>

<div id="register-container">
    <div class="p-5">
        <h3>Register New User</h3>
        <form on:submit|preventDefault={onSubmit}>
            <label for="fullname">Full Name</label>
            <input
                type="text"
                id="fullname"
                bind:value={user_fullname}
                placeholder="Enter your Full Name"
            />

            <label for="email">Email</label>
            <input
                type="email"
                id="email"
                bind:value={user_email}
                placeholder="Enter your Email"
            />

            <label for="password">Password</label>
            <input
                type="password"
                id="password"
                bind:value={password}
                placeholder="Enter your Password"
            />

            <button type="submit" class="btn">Create Account</button>
        </form>
        {#if errorMessage}
            <p class="error-message">{errorMessage}</p>
        {/if}
        <p class="text-muted text-center mt-4">
            Already registered? <a id="login-route" href="/Login">Return to Login</a>
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

p {
    color: black;
    letter-spacing: 1px;
    text-align: center;
    font-size: 0.9rem;
    margin-top: 10px;
}

.p-5 {
    backdrop-filter: blur(15px); /* Glass blur effect */
    background: rgba(255, 255, 255, 0.2); /* Transparent background */
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 15px;
    padding: 30px;
    margin: auto;
    width: 100%;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Subtle shadow */
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

#register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-top: 80px;
}

input[type="text"],
input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    margin-bottom: 15px;
    border: 2px solid #e91e63;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.5); /* Semi-transparent */
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

.error-message {
    color: red;
    margin-bottom: 15px;
}

#login-route {
    background: none;
    border: none;
    color: #e91e63;
    cursor: pointer;
    text-decoration: underline;
}
</style>
