let form = document.querySelector('#update_user');
console.log(form);
let unindexedArray = [];
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    let formData = new FormData(form);
    
    for (let entry of formData) {
        unindexedArray.push(entry);
    }
    let data ={};
    unindexedArray.map((value,index)=>{
        data[value[0]]=value[1];
    });
    console.log(data.id);
    //our request
    let request = {
        "url": `http://localhost:3000/api/users/${data.id}`,
        "method":"PUT",
        "data":data
    }

    $.ajax(request).done(response=>{
        alert('data updated succesfully');
    });
});

 //trying to use the fetch api instead
    // fetch(`http://localhost:3000/api/users/${data.id}`, request)
    // .then(response => response.json())
    // .then(d => {
    //     console.log('success:', d);
    // })
    // .catch(err=>{
    //     console.log('error:', err);
    // })