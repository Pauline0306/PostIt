<script>
  import { onMount } from "svelte";

  let searchTerm = "";
  /**
	 * @type {any[]}
	 */
  let posts = [];
  /**
	 * @type {any[]}
	 */
  let filteredPosts = [];
  let isVisible = false;
  /**
	 * @type {{ image: any; title: any; content: any; } | null}
	 */
  let selectedPost = null;
  /**
	 * @type {any[]}
	 */
  let comments = [];
  let newComment = "";

  onMount(() => {
    posts = [
      {
        id: 1,
        title: "CCS Women Basketball team",
        content: "Missing the team so much",
        user_fullname: "Pauline Astorga",
        created_at: new Date().toISOString(),
        image: null,
      },
    ];
    filteredPosts = posts;
  });

  $: filterPosts();

  function filterPosts() {
    filteredPosts = posts.filter((post) =>
      post.user_fullname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const truncateText = (/** @type {string} */ text, /** @type {number} */ length) =>
    text.length > length ? text.substring(0, length) + "..." : text;

  const openModal = (/** @type {any} */ post) => {
    selectedPost = post;
    isVisible = true;
  };

  const closeModal = () => {
    isVisible = false;
    selectedPost = null;
  };

  const addComment = () => {
    if (newComment.trim()) {
      comments = [...comments, { comment: newComment }];
      newComment = "";
    }
  };
</script>

<div class="container">
  <!-- Side Navigation -->
  <div class="side-nav">
    <h2>PixelMinds</h2>
    <ul>
      <li><a href="home">Home</a></li>
      <li><a href="mypost">Mypost</a></li>
      <li><a href="profile">Profile</a></li>
      <li><a href="createpost">CreatePost</a></li>
      <li><a href="logout">Logout</a></li>
    </ul>
  </div>

  <!-- Main Content -->
  <div class="main-content">
    <div class="header">
      <div class="upper-header">
    
      </div>
    </div>

    <div class="search-container">
      <input
        type="text"
        placeholder="Search by author's name..."
        bind:value={searchTerm}
      />
    </div>

    <div class="feed-container">
      <div class="feed-posts">
        {#each filteredPosts as post}
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div class="feed-item" on:click={() => openModal(post)}>
            <img
              src={post.image || "/assets/ccs.jpg"}
              alt={post.title || "Post Image"}
            />
            <div class="feed-holder">
              <div class="feed-header">
                <div class="author-info">
                  <div class="profile-pic-container"></div>
                  <p id="fullname">{post.user_fullname}</p>
                  <p id="date">
                    {new Date(post.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <div class="feed-body">
                <p class="post-title">{post.title}</p>
                <hr />
                <p class="post-content">{truncateText(post.content, 100)}</p>
              </div>
            </div>
            <button
              class="read-more-button"
              on:click={(e) => {
                openModal(post);
                e.stopPropagation();
              }}
            >
              Read More
            </button>
          </div>
        {/each}
      </div>
    </div>

    {#if isVisible}
      <div class="modal">
        <div class="modal-content">
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <span class="close-button" on:click={closeModal}>&times;</span>
          <div class="modal-image">
            <img
              src={selectedPost?.image || "/assets/ccs.jpg"}
              alt={selectedPost?.title || "Selected Post"}
            />
          </div>
          <h2>{selectedPost?.title}</h2>
          <p>{selectedPost?.content}</p>

          <div class="comment-section">
            <h3>Comments</h3>
            <div class="comments-display">
              {#each comments as comment}
                <div class="comment">
                  <span class="comment-user">{comment.comment}</span>
                </div>
              {/each}
            </div>

            <div class="comment-input">
              <input
                type="text"
                bind:value={newComment}
                placeholder="Add a comment..."
              />
              <button on:click={addComment} class="submit-comment">Post</button>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  /* Reuse your styles; they are already well-written */

  .container {
    display: flex;
    min-height: 100vh;
  }

  .side-nav {
    width: 200px;
    background: linear-gradient(to right, #f48fb1, #7b1fa2); /* Pink-purple gradient */
    padding: 1rem;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    color: white;
    position: fixed;
    height: 100%;
  }

  .side-nav h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .side-nav ul {
    list-style: none;
    padding: 0;
  }

  .side-nav ul li {
    margin: 1rem 0;
  }

  .side-nav ul li a {
    text-decoration: none;
    color: white;
    font-size: 1.1rem;
    transition: color 0.3s ease;
  }

  .side-nav ul li a:hover {
    color: #ffcccb; /* Light pink hover */
  }

  .main-content {
    margin-left: 250px; /* Leave space for the side-nav */
    flex-grow: 1;
    padding: 1rem;
    background-color: #fafafa; /* Light gray for contrast */
  }


  .search-container {
  display: flex;
  justify-content: center;
  
}

.search-container input[type="text"] {
  width: 50%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #e0bbf3; /* Light lavender border */
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.8);
}

.feed-container {
  background: linear-gradient(to right, #f48fb1, #7b1fa2); /* Pink to deep purple gradient */
  margin: 1rem 0;
  border-radius: 6px;
  padding: 1rem;
}

.feed-posts {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 16px 8px; 
}

.feed-item {
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

@media (max-width: 1024px) {
  .feed-posts {
    grid-template-columns: repeat(3, 1fr); 
  }
}

@media (max-width: 768px) {
  .feed-posts {
    grid-template-columns: repeat(2, 1fr); 
  }
}

@media (max-width: 480px) {
  .feed-posts {
    grid-template-columns: 1fr;
  }
}

.author-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

#fullname {
  color: #0d0d0e; /* Dark purple text */
  margin-right: 0.5rem;
}

#date {
  font-size: 0.8vmax !important;
  color: #0f0f0f;
}

.profile-pic-container {
  width: 3vmin;
  height: 3vmin;
  border-radius: 50%;
  background-color: #e1bee7; /* Light purple */
  background-image: url('/assets/user.jpg');
  background-size: cover;
  background-position: center;
  margin: 0.125rem 0.25rem;
}

.post-title {
  margin-top: 0.6rem;
  font-size: 1.5vmax !important;
  font-weight: 700;
  color: #121213;
}

.post-content {
  margin-top: 1.3rem;
  font-size: 1vmax !important;
  color: #1e0d46;
}


.upper-header {
  display: flex;
}


.read-more-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: rgba(142, 36, 170, 0.8); /* Purple with transparency */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.read-more-button:hover {
  background-color: rgba(216, 27, 96, 0.8); /* Pink with transparency */
}

.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent dark background */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Prevent scrolling of the main page */
}

.modal-content {
  background: linear-gradient(135deg, #f8bbd0, #f3e5f5); /* Soft pink gradient background */
  padding: 30px;
  border: 1px solid #ec407a; /* Pink border */
  border-radius: 12px;
  width: 80%;
  max-width: 900px;
  max-height: 90vh;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Aesthetic shadow */
  position: relative;
  overflow-y: auto; /* Enable scrolling for content inside the modal */
}


.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close-button:hover,
.close-button:focus {
  color: #512da8;
}

.comment-section {
  margin-top: 20px;
}

.comment-section h3 {
  color: #512da8; /* Purple color for the heading */
  margin-bottom: 15px; /* Adds more space below the heading */
  font-size: 0.75rem; /* Smaller font size for a subtle heading */
  font-weight: bold; /* Makes the text bold */
  letter-spacing: 1px; /* Adds slight spacing between letters for a cleaner look */
  padding-bottom: 5px; /* Adds a small gap below the heading */
  border-bottom: 2px solid #512da8; /* Adds a solid underline with the same purple color */
}

.comments-display {
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f3e5f5; /* Light purple */
  border-radius: 4px;
}

.comment {
  display: flex; 
  flex-direction: column;
  margin-bottom: 10px;
  padding: 8px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
}


.comment-user {
  font-size: 0.85rem;
  color: #512da8;
  font-weight: bold;
}


.comment-input {
  display: flex;
  gap: 10px;
}

.comment-input input[type="text"] {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #e0bbf3;
  border-radius: 4px;
}

.submit-comment {
  background-color: #7e57c2;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-comment:hover {
  background-color: #ab47bc;
}
</style>
