<script>
    import { onMount } from 'svelte';
    let postTitle = '';
    let postContent = '';
    let imagePreview = '';
    let userProfile = { fullname: 'John Doe' };
  
    import Quill from 'quill';
    /**
	 * @type {Quill}
	 */
    let quill;
  
    onMount(() => {
      quill = new Quill('#editor', {
        theme: 'snow',
        placeholder: 'Write your content here...',
        modules: {
          toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline'],
            [{ align: [] }],
            ['link', 'image'],
          ],
        },
      });
  
      quill.on('text-change', () => {
        postContent = quill.root.innerHTML;
      });
    });
  
    const createPost = () => {
      console.log('Post Title:', postTitle);
      console.log('Post Content:', postContent);
      console.log('Post Image Preview:', imagePreview);
    };
  
    const onImageSelected = (/** @type {{ target: any; }} */ event) => {
      const input = event.target;
      if (input && input.files) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          // @ts-ignore
          imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
  
    const closePostEditor = () => {
      console.log('Closing post editor');
    };
  </script>
  
  <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
  
  <div id="container">
    <div id="header">
      <div class="title">
        <h3>Create New Post</h3>
      </div>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div class="icon" role="button" tabindex="0" on:click={closePostEditor}>
        &times;
      </div>
    </div>
    <hr />
    <div id="in-div">
      <div id="content">
        <div class="create-post-title">
          <p>
            What's on your mind, <strong>{userProfile.fullname}</strong>?
          </p>
        </div>
        <div class="create-post-form-wrapper">
          <form class="create-post-form" on:submit|preventDefault={createPost}>
            <div class="form-group">
              <input
                type="text"
                autocomplete="off"
                id="posttitle"
                required
                placeholder="Title"
                bind:value={postTitle}
              />
            </div>
            <div class="form-group">
              <div id="editor"></div>
            </div>
            <div class="form-group">
              <label for="postImage">Choose an image</label>
              <input
                type="file"
                id="postImage"
                on:change={onImageSelected}
                accept="image/*"
              />
            </div>
            {#if imagePreview}
              <div class="image-preview">
                <!-- svelte-ignore a11y_img_redundant_alt -->
                <img src={imagePreview} alt="Image Preview" />
              </div>
            {/if}
            <div class="form-btn">
              <button class="btn" type="submit">Publish</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  <style>

  
    #container {
      width: 60%;
      max-width: 800px;
      margin: 100px auto;
      padding: 2rem;
      border-radius: 10px;
      background: linear-gradient(135deg, #f06292, #4a148c);
      display: flex;
      flex-direction: column;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
      color: #fafafa;
    }
  
    #header {
      display: flex;
      justify-content: space-between;
      align-items: center;
  
    }
  
    .title h3 {
      font-family: Georgia, serif;
      margin: 0;
      color: #c4bbf0;
      font-size: 1.5rem;
    }
  
    .icon {
      cursor: pointer;
      font-size: 1.5rem;
    
    }
  
    .create-post-title p {
      color: #ffffff;
      font-size: 1.3rem;
      margin: 0;
      padding-bottom: 1rem;
    }
  
    .create-post-form-wrapper {
      background-color: #fafafa;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    .form-group input,
    .form-group #editor {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
  
    #editor {
      height: 200px;
    }
  
    .form-btn .btn {
      background-color: #4f3b78;
      color: #fff;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
  
    .form-btn .btn:hover {
      background-color: #6f5b98;
    }
  
    .image-preview img {
      max-width: 100%;
      max-height: 300px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  </style>
  