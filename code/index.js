function updateCurrentImage(currentThumbnail) {
	// get path to new Image from current thumbnail src attribute
	let thumbnailPath = currentThumbnail[0]
		.querySelector("img")
		.getAttribute("src");

	// Generate new path for current image in view
	let newImgPath = thumbnailPath.replace("-thumbnail", "");

	// apply new path to current image in view
	let currentImgs = document.querySelectorAll(".item_image_in_view");
	currentImgs.forEach((Img) => {
		Img.querySelector("img").setAttribute("src", newImgPath);
	});
}
function changeCurrentThumbnail(nextThumbnails) {
	// Select current Thumbnail
	let currentThumbnail = document.querySelectorAll(".current_image_thumbnail");
	// Remove current Thumbnail class from old thumbnail
	currentThumbnail.forEach((thumbnail) => {
		thumbnail.classList.remove("current_image_thumbnail");
	});

	// Apply current thumbnail class to new thumbnail
	nextThumbnails.forEach((thumbnail) => {
		thumbnail.classList.add("current_image_thumbnail");
	});
	return nextThumbnails;
}
function getNextThumbnails(direction, currentThumbnail) {
	// first get current thumbnail number
	let currentClass = currentThumbnail.classList[1];
	let currentNumber = Number(currentClass[currentClass.length - 1]);

	// get base class name without number attached
	let baseClass = currentClass.substr(0, currentClass.length - 1);

	// based on direction, get new number and append to new base class name
	if (direction == "icon-next") {
		baseClass = baseClass + ((currentNumber % 4) + 1);
	} else if (direction == "icon-previous") {
		currentNumber = currentNumber == 1 ? 4 : --currentNumber;
		baseClass = baseClass + currentNumber;
	}

	return document.querySelectorAll("." + baseClass);
}
function toggleHideIfClicked(elementToHide, clickedElement) {
	clickedElement.addEventListener("click", () => {
		elementToHide.classList.toggle("hidden");
	});
}

/* Icon Functions */
let iconClose = document.querySelector(".lightbox .icon-close");
let lightbox = document.querySelector(".lightbox");
let currentImage = document.querySelector(".main_left .item_image_in_view");
toggleHideIfClicked(lightbox, currentImage);
toggleHideIfClicked(lightbox, iconClose);

// Switching images by various clicks
let imgContainers = document.querySelectorAll(".images_container");

imgContainers.forEach((imgContainer) => {
	// on click of any item in image container:
	imgContainer.addEventListener("click", (event) => {
		let itemClicked = event.target;
		// if item clicked = thumbnail
		if (itemClicked.parentNode.classList.contains("thumbnail_image")) {
			//get nextThumbnails
			let thumbnail = itemClicked.parentNode;
			let nextThumbnails = document.querySelectorAll(
				`.${thumbnail.classList[0]}.${thumbnail.classList[1]} `
			);
			// update currentImage(passing currnt thumbnail);
			// changeCurrentThumbnail(passing thumbnail clicked || next thumbnail)
			updateCurrentImage(changeCurrentThumbnail(nextThumbnails));
		}

		if (
			// if item clicked = nextButton || item clicked = prevButton
			itemClicked.classList.contains("icon-next") ||
			itemClicked.classList.contains("icon-previous")
		) {
			direction = itemClicked.classList[1];
			currentThumbnail = imgContainer.querySelector(".current_image_thumbnail");

			// updateCurrentImage after changingThumbnail after Getting next thumbnail
			updateCurrentImage(
				changeCurrentThumbnail(getNextThumbnails(direction, currentThumbnail))
			);
		}
	});
});

// update number of items
let numItemsContainer = document.querySelector(".number_of_items");
let iconMinus = numItemsContainer.querySelector(".icon-minus");
let iconPlus = numItemsContainer.querySelector(".icon-plus");
let numItems = numItemsContainer.querySelector(".current_quantity");

iconPlus.addEventListener("click", () => {
	numItems.innerText = Number(numItems.innerText) + 1;
});
iconMinus.addEventListener("click", () => {
	if (numItems.innerText > 0)
		numItems.innerText = Number(numItems.innerText) - 1;
});
