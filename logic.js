var btn = document.querySelector('button');
var usersDiv = document.querySelector('.users');
var chosenUser = document.querySelector('.chosenUser');
var liArray = [];

function creatingElement(elementTag,innerHtml,appendTo){
    const ele = document.createElement(elementTag);
    ele.innerHTML = innerHtml;
    appendTo.appendChild(ele);
}


btn.addEventListener("click", ()=>{

    fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((response) => {

            // Setting users into local storage
            var str = JSON.stringify(response);
            localStorage.setItem('Users', str);

            // refresh page, to list newly added users
            location.reload();
        })
          
})

// Waiting till window/document loads
window.addEventListener("load", ()=>{

    // Getting users from localstorage
    var getStr = localStorage.getItem('Users');

    if(getStr){
        
        getStr = JSON.parse(getStr);
        
        // For each user create html li element and place user into it
        getStr.map((element)=>{
            
            creatingElement("li",`${element.name}<br>${element.address.city} <br><br>`,usersDiv)

        })
        

        document.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', event => {
              var myUser = event.target;
                let chosen = myUser.firstChild.textContent;
                myUser.remove();

                
                // Getting users objects
                fetch('https://jsonplaceholder.typicode.com/users')
                    .then((response) => response.json())
                    
                    // find and return user by name
                    .then(response => response.find(user=> user.name == chosen ))
                    .then(user=>{

                        // Get specific user by id
                        fetch('https://jsonplaceholder.typicode.com/users/'+ user.id)
                            .then(response => response.json())
                            .then(response => {

                                // If element is not null remove html element
                                if(document.querySelector('.chosenUser').firstChild){
                                    document.querySelector('.chosenUser').firstChild.remove()
                                }
                                
                                // Creating element and appending user to html
                                creatingElement("li",`Izabrani Korisnik: ${response.name} ${response.email} ${response.address.city}`,chosenUser)


                            })
                    
                    })

            })
        })
        
    }
})

document.querySelectorAll('button')[1].addEventListener("click",event=>{
    localStorage.clear();

    //delete users from html
    usersDiv.innerHTML = '';
    chosenUser.innerHTML = '';
})