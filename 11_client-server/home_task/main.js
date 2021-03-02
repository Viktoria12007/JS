function createBlogTitle() {
    let blogTitle = document.createElement('h2');
    blogTitle.textContent = 'Список статей';
    blogTitle.classList.add('mb-4', 'mt-5', 'text-center');
    return blogTitle;
}
function createBlogList(array) {

    const blogList = document.createElement('ul');
    blogList.classList.add('list-group','mb-5');

    array.data.forEach(element => {
        const link = document.createElement('a');
        link.classList.add('list-group-item', 'btn', 'btn-warning', 'text-decoration-none', 'text-dark');
        link.textContent = element.title; 
        link.setAttribute('href', 'post.html?id=' + element.id);
        blogList.append(link);
     }); 

    return blogList;
}
function createBlogPagination(array) {
    const blogPagination = document.createElement('div');
    blogPagination.classList.add('d-flex', 'flex-wrap', 'justify-content-center', 'align-items-center');

    const containerFastLink = document.createElement('div');
    containerFastLink.classList.add('d-flex', 'flex-wrap', 'mb-3');

    const linkPrev = document.createElement('a');
    linkPrev.textContent = 'Назад';
    linkPrev.classList.add('d-block', 'btn', 'btn-warning', 'text-decoration-none', 'text-dark', 'mb-1');
    linkPrev.style.marginRight = '10px';

    const linkNext = document.createElement('a');
    linkNext.textContent = 'Вперёд';
    linkNext.classList.add('d-block', 'btn', 'btn-warning', 'text-decoration-none', 'text-dark', 'mb-1');

    containerFastLink.append(linkPrev);
    containerFastLink.append(linkNext);
    blogPagination.append(containerFastLink);

    const blogPaginationList = document.createElement('ul');
    blogPaginationList.classList.add('list-inline', 'd-flex', 'flex-wrap');
    
    for(let i = 1; i <= array.meta.pagination.pages; i++) {
     const linkPage = document.createElement('a');
     linkPage.textContent = i;
     
     if (i == 1) {
        linkPage.setAttribute('href', 'index.html');   
     }
     if (i!==1)  {
        linkPage.setAttribute('href', 'index.html?page=' + i);
    }

     linkPage.classList.add('d-block', 'btn', 'btn-warning', 'text-decoration-none', 'text-dark', 'mb-1');
     linkPage.style.marginRight = '10px';
     blogPaginationList.append(linkPage);

    }

    blogPagination.append(blogPaginationList);
    
    return {
        blogPagination,
        linkPrev,
        linkNext
    }
}

function createPost(array) {
     const titlePost = document.createElement('h1');
     titlePost.classList.add('mt-3');
     titlePost.textContent = array.data.title;
     const textPost = document.createElement('p');
     textPost.textContent = array.data.body;

     return {
         titlePost,
         textPost
     }
}

function createCommentsList(array) {

    const listComments = document.createElement('dl');
        
    if (array.data.length !== undefined) {
        
        for (let i=0; i <= array.data.length-1; i++) {

        const itemNameComments = document.createElement('dt');
        itemNameComments.textContent = array.data[i].name;

        const itemBodyComments = document.createElement('dd');
        const time = array.data[i].created_at;
        const timeData = time.slice(0, 10).split("-").reverse().join(".");
        const timeClock = time.slice(11, 16);
        itemBodyComments.innerHTML = timeData + ',' + ' ' + timeClock + '<br>' + array.data[i].body;

        listComments.append(itemNameComments);
        listComments.append(itemBodyComments);
        }

    }
    else return;
    
    return listComments;
}

async function createBlogApp(container) {

    const pageParams = new URLSearchParams(window.location.search); 
    let pageNumber = pageParams.get('page');
    

    const response = await fetch('https://gorest.co.in/public-api/posts?page=' + pageNumber);
    const data = await response.json(); 
     
    const blogTitleElement = createBlogTitle();
    const blogPaginationElement = createBlogPagination(data);
     
    if (Number(pageNumber) !== 1 && pageNumber !== null) {
        
        blogPaginationElement.linkPrev.classList.remove('disabled');
        blogPaginationElement.linkPrev.setAttribute('href', 'index.html?page=' + String(Number(pageNumber) - 1));
        
        if (Number(pageNumber) === 2) {
          blogPaginationElement.linkPrev.setAttribute('href', 'index.html');
        } 
    }
    if (Number(pageNumber) === 1 || pageNumber === null) {

        blogPaginationElement.linkPrev.classList.add('disabled');

        if (pageNumber===null) {
            pageNumber = 1;
        }
    }
    
    if (Number(pageNumber) !== data.meta.pagination.pages) { 
        blogPaginationElement.linkNext.classList.remove('disabled');
        blogPaginationElement.linkNext.setAttribute('href', 'index.html?page=' + String(Number(pageNumber) + 1));
    }

    else {
        blogPaginationElement.linkNext.classList.add('disabled');
    }

    const blogListElement = createBlogList(data);

    container.append(blogTitleElement);
    container.append(blogPaginationElement.blogPagination);
    container.append(blogListElement);
     
}
async function createPostApp(container) {

     const pageParams = new URLSearchParams(window.location.search); 
     const pageId = pageParams.get('id');
     
     const response = await fetch('https://gorest.co.in/public-api/posts/' + pageId);
     const data = await response.json(); 
     
     const postElement = createPost(data);
     container.append(postElement.titlePost);
     container.append(postElement.textPost);

     const responseComments = await fetch('https://gorest.co.in/public-api/comments?post_id=' + pageId);
     const dataComments = await responseComments.json(); 

     const commentsListElement = createCommentsList(dataComments);
     container.append(commentsListElement);
     
}