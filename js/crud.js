let isEdit=false;
let editId=null;
let books;
function addOrEdit(){
   if(isEdit){
    if( document.querySelector('#title').value=='' ||
   document.querySelector('#author').value=='' ||
   document.querySelector('#price').value==''){
    alert("Please fill all fields");
    return;
   }
    books.forEach((book)=>{
        if(editId==book.id){
         book.title=document.querySelector('#title').value;
         book.author=document.querySelector('#author').value;
         book.price=document.querySelector('#price').value;
        }
    });
   writeTable();
   document.querySelector('#title').value='';
   document.querySelector('#author').value='';
   document.querySelector('#price').value='';
   }
   else{
       addBook();
   }
   isEdit=false;
   return;
}
function addBook(){
   if( document.querySelector('#title').value=='' ||
   document.querySelector('#author').value=='' ||
   document.querySelector('#price').value==''){
    alert("Please fill all fields");
    return;
   }
   let bookCount=books.length;
   let new_id=bookCount+1;
   let new_title=document.querySelector('#title').value;
   let new_author=document.querySelector('#author').value;
   let new_price=document.querySelector('#price').value;
   let newBook={
       id:new_id,
       title:new_title,
       author:new_author,
       price:new_price,
       available:false
   }
   books.push(newBook);      // create              
   writeTable();
   document.querySelector('#title').value='';
   document.querySelector('#author').value='';
   document.querySelector('#price').value='';
}
function editBook(id){
   isEdit=true;
   let editBook;
  books.forEach((book)=>{
    if(book.id==id)
       {
        editBook=book;
        
       }
    editId=id;
  });
  document.querySelector('#title').value=editBook.title;
  document.querySelector('#author').value=editBook.author;
  document.querySelector('#price').value=editBook.price;
}
function deleteBook(id){
 let conf=confirm("Sure to delete??");
 if(conf==false){
     return;
 }
 books=books.filter((book)=>{
       return book.id!=id
 });
 writeTable();
}
function writeTable(){
    let iHtml=`<tr>
          <th>Id</th>
          <th>Title</th>
          <th>Author</th>
          <th>Price</th>
          <th>Action</th>
      </tr>`;
   books.forEach(book => { //read
              
              let r=`
              <tr>
                  <td>${book.id}</td>
                   <td>${book.title}</td>
                   <td>${book.author}</td>
                   <td>${book.price}</td>
                   <td>
                      <a  class='btn' href="#" onClick='editBook(${book.id})' >Edit</a>
                      <a  class='btn' href="#" onClick='deleteBook(${book.id})'>Delete</a>
                  </td>
              </tr>
              `;
        iHtml=iHtml+r;
       
      });
      if(books.length==0){
        let r=`
              <tr>
                  <td colspan='5' style='text-align:center'>There is no books</td>
                  
              </tr>
              `; 
              iHtml=iHtml+r;
      }
      document.querySelector('#tbl').innerHTML=iHtml;
    //save all books in storage
    localStorage.setItem("books_record",JSON.stringify(books) );
}
document.body.onload = function() {initApp()};
function initApp(){
    //fetch all books from storage
    books=JSON.parse(localStorage.getItem("books_record"));
    writeTable();
}
function deleteAll(){
    localStorage.setItem("books_record",[]);
    books=[];
    writeTable();
}