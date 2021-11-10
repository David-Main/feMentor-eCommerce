// Functions
function addOne(element = numItem, val = 1) {
	element.innerText = Number(element.innerText) + val;
}
function minusOne(element = numItem, val = 1) {
	if (element.innerText > 0)
		element.innerText = Number(element.innerText) - val;
}
function gets(element) {
	return document.querySelectorAll(element);
}
function get(element) {
	return document.querySelector(element);
}
function toggleClass(className, element_To_Toggle) {
	element_To_Toggle.classList.toggle(className);
}
function toggleState(item_to_toggle, [...items_to_be_clicked], toggleAction) {
	document.addEventListener("click", (e) => {
		clickedItem = e.target;
		items_to_be_clicked.forEach((item) => {
			if (clickedItem == item) {
				toggleAction();
			}
		});
	});
}

/*   Sidebar toggle visibility   */
let sideBarIcon = gets(".nav .icons-menu");
let sideBar = get(".nav_middle");
let sideBarCloseIcon = gets(".nav_middle_inner .icons-close");
toggleState(sideBar, sideBarIcon, () => {
	toggleClass("in_view", sideBar);
});
toggleState(sideBar, sideBarCloseIcon, () => {
	toggleClass("in_view", sideBar);
});

/*   CartMenu toggle visibility   */
let cartIcon = gets(".nav .icons-cart");
let cartMenu = get(".nav .cart_menu");
toggleState(cartMenu, cartIcon, () => {
	toggleClass("hidden", cartMenu);
});

/*   Number of item toggle increase or decrease */
let numItem = get(".current_quantity");
let minusIcon = gets(".icons-minus");
let plusIcon = gets(".icons-plus");
toggleState(numItem, plusIcon, addOne);
toggleState(numItem, minusIcon, minusOne);

let thumbnails = document.querySelectorAll(".thumbnail");
let imageInViewElement = document.querySelector(".current_image");
let imageInViewBackground = document.querySelector(".picture_in_view");
function updateThumbnail(currentImage, triggeringElemnt) {
	// get Next Image path
	let path = "";
	if (triggeringElemnt in thumbnails) {
		// item clicked was a thumbnail
		// get thumbnail source path
		path = triggeringElemnt.getAttribute("src");
	}
	// remove 'thumbnail' word from path of thumbnail
	path = path.replace("-thumbnail", "");

	// if current Image is the image element
	// replace current image path with new path
	if (currentImage == imageInViewElement) {
		currentImage.setAttribute("src", path);
		currentImage.style.backgroundImage = `url(${path})`;
	}

	currentImage.style.backgroundImage = url(path);
}
