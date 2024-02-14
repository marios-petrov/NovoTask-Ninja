

document.addEventListener('DOMContentLoaded',()=>{
    const createButton = document.querySelector("#create-button")

    
    createButton.addEventListener('click',createClicked)
})


function createClicked(){
    alert('clicked create')
}

