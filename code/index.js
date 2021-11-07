/* Icon Functions */
let iconClose = document.querySelector(".lightbox .icon-close");
let lightbox = document.querySelector(".lightbox");
iconClose.addEventListener("click", () => {
	lightbox.classList.toggle("hidden");
});

let currentImage = document.querySelector(".main_left .item_image_in_view");
currentImage.addEventListener("click", () => {
	lightbox.classList.toggle("hidden");
});

// Switching images by click
let imgContainers = document.querySelectorAll(".images_container");
imgContainers.forEach((imgContainer) => {
	imgContainer.addEventListener("click", (e) => {
		let itemClicked = e.target;
		if (itemClicked.classList.contains("alt_image")) {
			// remove current Thumbnail attribute
			document
				.querySelectorAll(".current_image_thumbnail")
				.forEach((thumbnail) => {
					thumbnail.classList.remove("current_image_thumbnail");
				});

			// add current thumbnail attribute to clicked item
			// and same counterpart item in the lightbox and vice versa;
			let classOfClickedItem =
				"." + itemClicked.parentNode.classList.value.split(" ").join(".");
			let newCurrentthumbnail = document.querySelectorAll(classOfClickedItem);
			newCurrentthumbnail.forEach((thumbnail) => {
				thumbnail.classList.add("current_image_thumbnail");
			});

			// Change current image in view based on current thumbnail image
			let newCurrentImgpath = itemClicked
				.getAttribute("src")
				.replace("-thumbnail", "");
			let currentImageAll = document.querySelectorAll(".item_image_in_view");
			currentImageAll.forEach((currentImg) => {
				currentImg.querySelector("img").setAttribute("src", newCurrentImgpath);
			});
		}

		// Switch by next and previous buttons

		if (itemClicked.classList.contains("icon-next")) {
			console.log("right");
		}
		if (itemClicked.classList.contains("icon-previous")) {
			console.log("left");
		}
	});
});
