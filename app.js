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
				toggleAction(clickedItem);
			}
		});
	});
}
function getNewPath(clickedItem) {
	if (clickedItem.classList.contains("thumbnail")) {
		return clickedItem.getAttribute("src").replace("-thumbnail", "");
	}
}
function changeSource(currentItem, newPath) {
	currentItem.setAttribute("src", newPath);
}
function updatethumbnails(newThumbnail) {
	let oldthumbnails = document.querySelectorAll(".current_thumbnail");
	oldthumbnails.forEach((thumbnail) => {
		toggleClass("current_thumbnail", thumbnail);
	});

	let newThumbnailClass = newThumbnail.classList[1];
	let newThumbnails = document.querySelectorAll(`.${newThumbnailClass}`);
	newThumbnails.forEach((thumbnail) => {
		toggleClass("current_thumbnail", thumbnail.parentNode);
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
	toggleClass("pressed", cartIcon[0]);
});

/*   Number of item toggle increase or decrease */
let numItem = get(".current_quantity");
let minusIcon = gets(".icons-minus");
let plusIcon = gets(".icons-plus");
toggleState(numItem, plusIcon, () => {
	addOne();
});
toggleState(numItem, minusIcon, () => {
	minusOne();
});

/*   Switch current Images   */
let currentImages = document.querySelectorAll(".current_image");
let altImages = document.querySelectorAll(".thumbnail");

toggleState(currentImages, altImages, (clickedItem) => {
	let newPath = getNewPath(clickedItem);
	currentImages.forEach((currentImage) => {
		changeSource(currentImage, newPath);
	});
	updatethumbnails(clickedItem);
});

let currentBackground = document.querySelector(".picture_in_view");

// generate srcs from thumnails
let thumbnails = document.querySelectorAll(".thumbnail");
let imgSrcs = [];
thumbnails.forEach((thumbnail) => {
	imgSrcs.push(thumbnail.getAttribute("src").replace("-thumbnail", ""));
	imgSrcs = imgSrcs.splice(0, 4);
});

// toggle directionIcon clicks
let nextIcons = document.querySelectorAll(".icon-next");
let prevIcons = document.querySelectorAll(".icon-previous");
toggleState(currentImages, nextIcons, () => {
	// if nextIcons is clicked, take current image to next image in list
	currentImages.forEach((image) => {
		let newPath = imgSrcs[(imgSrcs.indexOf(image.getAttribute("src")) + 1) % 4];
		changeSource(image, newPath);
	});
});

toggleState(currentImages, prevIcons, () => {
	// preveious Icon is clicked, take current image to previous
	// image in list;
	currentImages.forEach((image) => {
		let index = imgSrcs.indexOf(image.getAttribute("src")) - 1;
		index = index == -1 ? 3 : index;
		let newPath = imgSrcs[index];
		changeSource(image, newPath);
	});
});
