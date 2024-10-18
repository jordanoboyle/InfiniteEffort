
const postContainer = document.getElementById('posts-container');
const loading  = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 4;
let page = 1;

async function getPosts() {
  const response = await fetch( 
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  
  const data = await response.json();

  //It is important to remember that the fetch is returning a 'promise' so we need to make sure that 

  return data;
}