let cartItems = [
    {
        cartId: 1,
        cartImgSrc: "./assests/images/3.webp",
        cartProductName: "Wolf Shirt",
        cartProductPrice: 350
    },
    {
        cartId: 2,
        cartImgSrc: "./assests/images/2.webp",
        cartProductName: "Avenger Shirt",
        cartProductPrice: 550
    },
    {
        cartId: 3,
        cartImgSrc: "./assests/images/4.webp",
        cartProductName: "Stark Shirt",
        cartProductPrice: 420
    },
    {
        cartId: 4,
        cartImgSrc: "./assests/images/5.webp",
        cartProductName: "Star Shirt",
        cartProductPrice: 720
    },
    {
        cartId: 5,
        cartImgSrc: "./assests/images/6.webp",
        cartProductName: "Japan Shirt",
        cartProductPrice: 250
    },
    {
        cartId: 6,
        cartImgSrc: "./assests/images/7.webp",
        cartProductName: "WolfRed Shirt",
        cartProductPrice: 1100
    },
    {
        cartId: 7,
        cartImgSrc: "./assests/images/2.webp",
        cartProductName: "Avenger Shirt",
        cartProductPrice: 550
    },
    {
        cartId: 8,
        cartImgSrc: "./assests/images/8.webp",
        cartProductName: "Black Shirt",
        cartProductPrice: 580
    }
]

let loadCart = () => {
    cartItems.forEach((item) => {

        let cartTemplate = `<div class="cart_product-img">
                                <img src="${item.cartImgSrc}" alt="Name">
                            </div>
                            <span class="cart_product-brand">Hoodie</span>
                            <div class="cart_product-name">
                                ${item.cartProductName}
                            </div>
                            <div class="cart_product-footer">
                                <div class="cart_price">
                                    ₹ ${item.cartProductPrice}
                                </div>
                                <div class="cart_add">
                                    <i class='bx bx-plus'></i>
                                </div>
                            </div>
                            <div class="offer">20% Offer</div>`

        let cartBoxes = document.querySelector(".cart_boxes")

        let cartLi = document.createElement("li");
        cartLi.classList.add("cart_box-item");

        cartLi.innerHTML = cartTemplate;
        cartBoxes.append(cartLi)

    })
}

let sideCartItems = []

let orderBtn = document.querySelector(".order_btn");
orderBtn.addEventListener("click", ()=>{
    alert("Order Placed")
}) 

let navIconCount = ()=>{
    let cartCount = document.querySelector(".cart_count")
    cartCount.innerHTML  = sideCartItems.length
}

let updateTotal = ()=>{
    let total = 0;

    let allQtyPrice = document.querySelectorAll(".qty_price");

    allQtyPrice.forEach((item)=>{

        total += parseFloat(item.innerHTML.replace("₹", ""))
        
    })

    let sideCartTotal = document.querySelector(".sidecart_total span");
    sideCartTotal.innerHTML = total

}

let deleteCart = (delParent) =>{

    if(confirm("Are You Sure To Delete ")){
        delParent.parentElement.remove()

        sideCartItems = sideCartItems.filter((item)=>{
            return item.cartProductName != delParent.parentElement.querySelector(".sidecart_content-name").innerHTML
        })
        updateTotal()
        navIconCount()
    }

}

let changeQty = (qty) =>{

    if(qty.value < 1){
        qty.value = 1
    }
    
    let actualPrice = parseFloat(document.querySelector(".actual_price").innerHTML.replace("₹", ""));
    let qtyPrice = document.querySelector(".qty_price");
    
    qtyPrice.innerHTML = `₹ ${(qty.value * actualPrice)}`
    updateTotal()
}


let addProduct = (event) => {

    let cartParent = event.target.parentElement.parentElement.parentElement;
    let cartImgSrc = cartParent.querySelector(".cart_product-img img").src;
    let cartProductName = cartParent.querySelector(".cart_product-name").innerHTML.trim()
    let cartProductPrice = cartParent.querySelector(".cart_price").innerHTML.trim().replace("₹", "")

    let productInfo = {cartImgSrc, cartProductName, cartProductPrice}

    if(sideCartItems.find((item)=>item.cartProductName == productInfo.cartProductName)){
        alert("Already Added To Cart")
        return
    }

    sideCartItems.push(productInfo)

    let sideCartTemplate = ` <div class="sidecart_img">
                                <img src="${cartImgSrc}" alt="productImage">
                            </div>
                            <div class="sidecart_content">
                                <p class="sidecart_content-name">${cartProductName}</p>
                                <p class="sidecart_content-price">
                                    <span class="actual_price">₹ ${cartProductPrice} </span>
                                    <i class='bx bx-chevrons-right'></i> 
                                    <span class="qty_price">₹ ${cartProductPrice} </span>
                                </p>
                                <input type="number" class="sidecart_content-qty" value="1" onchange="changeQty(this)">
                            </div>
                            <div class="sidecart_delete" onclick="deleteCart(this)">
                                <i class='bx bx-trash' ></i>
                            </div> `

    let sideCartList = document.querySelector(".sidecart_list")

    let sideCartLi = document.createElement("li")
    sideCartLi.classList.add("sidecart_item")

    sideCartLi.innerHTML = sideCartTemplate
    sideCartList.append(sideCartLi)

    updateTotal()
    navIconCount()
}

let loaded = () => {

    loadCart()

    let navCartIcon = document.querySelector(".navbar_icons-link .bx-shopping-bag");
    let sideCart = document.querySelector(".sidecart")
    let sidecartClose = document.querySelector(".sidecart_close")
    let cartAdd = document.querySelectorAll(".cart_add")

    // Side Cart Toggle
    navCartIcon.addEventListener("click", () => {
        sideCart.classList.toggle("cart_active")
    })
    // SideCart Close
    sidecartClose.addEventListener("click", () => {
        sideCart.classList.remove("cart_active")
    })
    // cartAdd sidebar open
    cartAdd.forEach((addCart)=>{
        addCart.addEventListener("click", (event) => {
            sideCart.classList.add("cart_active")
            addProduct(event)
        })
    })
   
}

document.addEventListener("DOMContentLoaded", loaded)


