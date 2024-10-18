
const postContainer = document.getElementById('posts-container');
const loading  = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 6;
let page = 1;


//Fetch the Posts from API jsonplaceholder.typicode.com
async function getPosts() {
  const response = await fetch( 
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  
  const data = await response.json();

  //It is important to remember that the fetch is returning a 'promise' so we need to make sure that 

  return data;
}

//Show Posts in the DOM

async function showPosts() {
  const posts = await getPosts();  
  //Again...this is important in VJS. You must make sure to await the promise. 
  //Not as necessary in Vue.js or React.js, but it is pivotal in Vanilla

  // console.log(posts);

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;
    postContainer.appendChild(postElement);
  });
}

//Show Loading and fetch more posts
function showLoading() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

//Filter Posts by inputs
//
function filterPostsByInput(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body  = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

//Show initial posts
showPosts();


//Event Listeners
window.addEventListener('scroll', () => {
  // console.log(document.documentElement.scrollHeight);
  // console.log(document.documentElement.scrollTop);

  const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filter.addEventListener('input', filterPostsByInput);