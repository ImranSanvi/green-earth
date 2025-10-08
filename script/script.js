


const removeActive = () =>{
    const menuBtn = document.querySelectorAll('.menu-btn')
    menuBtn.forEach( (btn) => btn.classList.remove("active"))
}


const displayCategory = (id) =>{
    manageSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then( (response) => response.json())
    .then( (data) => {
        removeActive();
        const menuBtn = document.getElementById(`menu-btn-${id}`);
        menuBtn.classList.add("active");
        displayTree(data.plants)
    })
}


const displayMenu = (menu) =>{
    const menuContainer = document.getElementById("left");
    menuContainer.innerHTML = "";

   menu.forEach(element => {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML= `
            <button id="menu-btn-${element.id}" onclick="displayCategory(${element.id})" class="menu-btn w-full font-medium text-[16px] hover:bg-[#15803D]/40 text-left px-3 py-2 rounded-[5px]">${element.category_name}</button>
        `
        menuContainer.appendChild(btnDiv);
    });
}

const loadMenu = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then( (response) => response.json())
    .then( (data) => displayMenu(data.categories));
}

loadMenu();

let totalAmount = 0;

const updateTotal = () =>{
    const total = document.getElementById("total-amount");
    total.innerHTML = `
        <h3>Total:</h3>
        <h3><i class="fa-solid fa-bangladeshi-taka-sign"></i>${totalAmount}</h3>
    `
}

const removeCart = (price, element) =>{
    element.closest('.cart-item').remove();
    totalAmount -= price;
    updateTotal();
}

const addToCart = (price, name) =>{
    const cartCard = document.getElementById("right-card");
    const cartDiv = document.createElement('div');
    cartDiv.innerHTML = `
        <div class="cart-item flex justify-between mx-2 p-2 items-center bg-[#f0fdf4] rounded-[10px] mt-3">
            <div class="space-y-2">
                <h1 class="font-semibold text-[14px]">${name}</h1>
                <h3 class="text-[16px]"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${price} X 1</h3>
            </div>
            <h1 onclick="removeCart(${price}, this)" id="cross" class="w-[16px] h-[16px]">X</h1>
        </div>
    `
    cartCard.appendChild(cartDiv);
    totalAmount += price;
    updateTotal();
}


const manageSpinner= (status) =>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("mid").classList.add("hidden");
    }
    else{
        document.getElementById("mid").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}


const displayTree = (tree) =>{
    const treeContainer = document.getElementById('mid')
    treeContainer.innerHTML = "";
    tree.forEach(element => {
        const cardDiv = document.createElement('div')
        cardDiv.innerHTML = `
            <div class="rounded-[10px] bg-white space-y-5 pb-4 h-[100%]">
                <img class="w-full rounded-t-[10px] h-[185px]" src="${element.image}" alt="">
                <div class="px-7 space-y-4">
                    <h1 onclick="treeDetailsCall(${element.id})" class="font-semibold text-[14px]">${element.name}</h1>
                    <p class="text-[12px]">${element.description}</p>
                    <div class="flex flex-col md:flex-row justify-between">
                        <button class="bg-[#15803D]/40 font-medium text-[14px] rounded-[15px] px-3 py-1">${element.category}</button>
                        <h1 class="font-semibold text-[14px]"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${element.price}</h1>
                    </div>
                    <button onclick="addToCart(${element.price}, '${element.name}')" class="bg-[#15803D] font-medium text-[16px] rounded-[15px] text-center py-1 w-full">Add to Cart</button>
                </div>
            </div>
        `
        treeContainer.appendChild(cardDiv);
    });
    manageSpinner(false);
}

const loadTree = () =>{
    manageSpinner(true);
    fetch('https://openapi.programming-hero.com/api/plants')
    .then( (response) => response.json())
    .then( (data) => displayTree(data.plants))
}

loadTree();

document.getElementById('all-tree-btn').addEventListener('click', (event) =>{
    loadTree();
})


const treeDetails = (tree) =>{
    const plantDetails = document.getElementById("plant-details");
    plantDetails.innerHTML = `
        <h1 class="font-bold text-[20px]">${tree.name}</h1>
        <img class="w-full h-[200px] rounded-[10px]" src="${tree.image}" alt="">
        <h1 class="font-bold text-[14px]">category:<span class="text-[14px] font-normal"> ${tree.category}</span></h1>
        <h1 class="font-bold text-[14px]">price: <span class="text-[14px] font-normal"><i class="fa-solid fa-bangladeshi-taka-sign">${tree.price}</i></span></h1>
        <h1 class="font-bold text-[14px]">Description:<span class="text-[14px] font-normal">${tree.description}</span></h1>
    `
    document.getElementById("my_modal_5").showModal();
}

const treeDetailsCall = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then( (response) => response.json())
    .then( (data) => treeDetails(data.plants));
}