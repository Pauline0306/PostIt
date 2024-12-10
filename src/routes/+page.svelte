<script>
  import { onMount } from 'svelte';
  let searchTerm = '';
  
  const filterPosts = () => {
    console.log('Filtering posts with term:', searchTerm);
    // Add your filtering logic here
  };

  const goto = (/** @type {string} */ path) => {
    // Using window.location to simulate navigation to the login page
    // If you're using SvelteKit or a routing library, replace this with the appropriate routing method
    window.location.href = path;
  };
</script>

<div class="header">
  <nav class="topnav">
    <div class="upper-header">
      <h1 class="logo">PixelMinds</h1>
      <!-- Button that navigates to the login page -->
      <button on:click={() => goto('/Login')}>Login / Signup</button>
    </div>
  </nav>
</div>


<div class="feed-container">
  <div class="ads">
    <div class="about-div">
      <div class="about-title"></div>
      <div class="about-desc">
        <img src="/assets/blog1.jpg" alt="background">
        <div class="overlay-text">
          <p>
            Welcome to PixelMinds, the ultimate platform for writers, thinkers, and creators to share their thoughts.
            Our user-friendly interface and powerful tools make it easy for you to craft compelling blog posts,
            connect with like-minded individuals, and grow your audience.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

  <style>
    .header {
      padding: 10px 20px;
      background-color: #f8f9fa;
  
    }
    .upper-header {
  display: flex;
  justify-content: space-between; /* Pushes the logo and button apart */
  align-items: center; /* Ensures they are vertically aligned */
  width: 95%
}

.logo {
  font-family: Georgia, serif;
  font-size: 1.8rem;
  margin: 0; /* Removes any default margin for better alignment */
}
    .topnav h1 {
      font-family: Georgia, serif;
      font-size: 1.5rem;
    }
  
    .topnav button {
      font-family: Georgia, serif;
      padding: 10px 20px;
      background-color: #e91e63;
      color: white;
      border: none;
      border-radius: 10px;
      cursor: pointer;
    }
  
    .topnav button:hover {
      background-color: #c2185b;
    }

    .feed-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 20px auto;
    }
  
    .about-div {
      width: 90%;
      max-width: 1200px;
    }
  
    .about-desc {
      position: relative;
      width: 100%;
      height: 600px;
      border-radius: 8px;
      overflow: hidden;
      margin: 20px 0;
    }
  
    .about-desc img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: 8px;
    }
  
    .overlay-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      background-color: rgba(0, 0, 0, 0.6);
      color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
      width: 50%;
      max-width: 600px;
      max-height: 500px;
    }
  
    .overlay-text p {
      margin: 0;
      font-size: 1.1rem;
      line-height: 1.5;
    }
  
    @media (max-width: 768px) {
      .about-desc {
        height: 300px;
      }
  
      .overlay-text {
        width: 70%;
      }
    }
  
    @media (max-width: 480px) {
      .about-desc {
        height: 250px;
      }
  
      .overlay-text {
        padding: 15px;
        font-size: 1rem;
      }
    }
  </style>
  