<script>
// @ts-nocheck

  let filteredPosts = [
    // Example posts, this should come from your data source
    {
      user_fullname: 'John Doe',
      created_at: new Date(),
      edited: false,
      isEditing: false,
      title: 'Sample Post Title',
      content: 'This is the content of the post.',
      image: null,
      id: 1
    },
    // Add more posts as needed
  ];

  // Functions for editing, saving, cancelling, and deleting posts
  /**
	 * @param {{ user_fullname?: string; created_at?: Date; edited?: boolean; isEditing: any; title?: string; content?: string; image?: null; id?: number; }} post
	 */
  function editPost(post) {
    post.isEditing = true;
  }

  /**
	 * @param {{ user_fullname?: string; created_at?: Date; edited?: boolean; isEditing: any; title?: string; content?: string; image?: null; id?: number; }} post
	 */
  function saveEdit(post) {
    post.isEditing = false;
    // Save the changes to the post
  }

  /**
	 * @param {{ user_fullname?: string; created_at?: Date; edited?: boolean; isEditing: any; title?: string; content?: string; image?: null; id?: number; }} post
	 */
  function cancelEdit(post) {
    post.isEditing = false;
  }

  /**
	 * @param {number} postId
	 */
  function deletePost(postId) {
    // Delete the post with the given postId
    filteredPosts = filteredPosts.filter(post => post.id !== postId);
  }
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
      />
    </div>
  </div>



<div class="feed-container">


  {#each filteredPosts as post}
    <div class="feed-item">
      <!-- Load post.image dynamically with a fallback image -->
      <!-- svelte-ignore a11y_img_redundant_alt -->
      <img src={post.image ? post.image : '/assets/ccs.jpg'} alt="Post Image">
      <div class="feed-holder">
        <div class="feed-header">
          <div class="author-info">
            <p id="fullname">{post.user_fullname}</p>
            <p id="date">{new Date(post.created_at).toLocaleDateString()}</p>
            {#if post.edited}
              <p>Edited</p>
            {/if}
            {#if !post.isEditing}
              <div class="crud-actions">
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <i class="fa-solid fa-ellipsis-vertical" on:click={() => editPost(post)}></i>
              </div>
            {/if}
          </div>
        </div>
        {#if !post.isEditing}
          <div class="feed-body">
            <p class="post-title">{post.title}</p>
            <hr />
            <p class="post-content" innerHTML={post.content}></p>
          </div>
        {/if}
        {#if post.isEditing}
          <div class="feed-body">
            <form on:submit|preventDefault={() => saveEdit(post)}>
              <div id="title-div">
                <label for="title">Title:</label><br />
                <input id="title" bind:value={post.title} required />
              </div>
              <div id="content-div">
                <label for="content">Description:</label><br />
                <textarea id="content" bind:value={post.content} required></textarea>
              </div>
              <div class="feed-actions">
                <button type="button" on:click={() => cancelEdit(post)}>Cancel</button>
                <button class="delete-btn" on:click={() => deletePost(post.id)}>Delete</button>
                <button class="save-btn" type="submit">Save</button>
              </div>
            </form>
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>


<style>
  /* Your styles here */
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


/* Feed Container */
.feed-container {
  background: linear-gradient(to right, #f48fb1, #7b1fa2); /* Pink to deep purple gradient */
  margin: 1rem ;
  border-radius: 6px;
  padding: 1rem;

 
}



/* Feed Item */
.feed-item {

  border: 4px solid #ff6f61; /* Pink accent */
  background-color: #ffffff; /* White background */
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 18% 82%;
  gap: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feed-item:hover {
  transform: translateY(-2px); /* Slight lift on hover */
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
}  

/* Feed Body */

  .post-content {
    margin-top: 1.3rem;
    font-size: 1vmax;
    color: #000000; /* Black text for content */
  }


/* Feed Actions */
.feed-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
}

.feed-actions button {
  margin-left: 0.5rem;
  padding: 0.5vmax 1vmax;
  border: none;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Soft shadow */
  border-radius: 4px;
  transition: all 0.3s ease;
  font-size: 1.3vmax;
  background-color: #ff6f61; /* Pink background */
  color: #ffffff; /* White text */
  cursor: pointer;
}

.feed-actions button:hover {
  background-color: #ff3b30; /* Darker pink on hover */
  transform: translateY(-2px); /* Slight lift effect */
}

.feed-actions .save-btn {
  background-color: #ff6f61; /* Pink background */
  color: #ffffff; /* White text */
}

.feed-actions .save-btn:hover {
  background-color: #ff3b30; /* Darker pink on hover */
}

.feed-actions .delete-btn {
  background-color: #ffffff; /* White background */
  color: #ff6f61; /* Pink text */
  border: 1px solid #ff6f61; /* Pink border */
}

.feed-actions .delete-btn:hover {
  background-color: #ff3b61; /* Brighter pink on hover */
  color: #ffffff; /* White text on hover */
}

/* Feed Info */
.author-info {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
}

.author-info #fullname {
  color: #000000; /* Black text */
  padding: 0 0.5rem 0 0;
  font-weight: bold;
}

.author-info #date {
  font-size: 0.8vmax;
  color: #555555; /* Dark gray for dates */
  align-self: center;
}

.crud-actions {
  margin-left: auto;
}

.author-info i {
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  font-size: 1.5vmax;
  align-self: center;
  margin-right: 1rem;
  color: #ff6f61; /* Pink icons */
  transition: color 0.3s ease;
}

.author-info i:hover {
  color: #ff3b30; /* Darker pink on hover */
}

/* Title and Content Divs */
#title-div, #content-div {
  margin-top: 1rem;
}

#title-div label, #content-div label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #000000; /* Black text for labels */
}

#title-div input, #content-div textarea {
  width: 95%;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1); /* Soft shadow */
  border: 1px solid #ff9a9e; /* Light pink border */
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
  color: #000000; /* Black text */
  background-color: #ffffff; /* White background */
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

#title-div input:focus, #content-div textarea:focus {
  outline: none;
  border-color: #ff6f61; /* Pink border on focus */
  box-shadow: 0px 0px 5px rgba(255, 111, 97, 0.5); /* Pink glow */
}

</style>
