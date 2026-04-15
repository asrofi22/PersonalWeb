document.addEventListener("DOMContentLoaded", () => {
	function navigateToSection() {
		var hash = window.location.hash.substr(1);

		document.querySelectorAll("[data-page]").forEach((section) => {
			section.classList.remove("active");
		});

		if (!hash) {
			hash = "about";
			window.location.hash = "#" + hash;
		}

		var targetSection = document.querySelector('[data-page="' + hash + '"]');
		if (targetSection) {
			targetSection.classList.add("active");
		}

		document.querySelectorAll(".navbar-link").forEach((link) => {
			if (link.getAttribute("href") === "#" + hash) {
				document
					.querySelectorAll(".navbar-link")
					.forEach((link) => link.classList.remove("active"));
				link.classList.add("active");
			}
		});

		if (hash === "contact") {
			loadMap();
		}
	}

	window.addEventListener("hashchange", navigateToSection);

	navigateToSection();
});

const elementToggleFunc = (elem) => {
	elem.classList.toggle("active");
};

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", () => {
	elementToggleFunc(sidebar);
});

const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

document.querySelectorAll(".project-item").forEach((item) => {
	item.addEventListener("click", function () {
		const imgSrc = this.querySelector("img").src;
		const title = this.querySelector(".project-title").textContent;
		const category = this.querySelector(".project-category").textContent;

		document.getElementById("modalImg").src = imgSrc;
		document.getElementById("modalTitle").textContent = title;
		document.getElementById("modalCategory").textContent = category;
		document.getElementById("certificateModal").style.display = "block";
	});
});

document.querySelector(".close-button").addEventListener("click", () => {
	document.getElementById("certificateModal").style.display = "none";
});
window.onclick = (event) => {
	const modal = document.getElementById("certificateModal");
	if (event.target == modal) {
		modal.style.display = "none";
	}
};

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
	elementToggleFunc(this);
});

for (let i = 0; i < selectItems.length; i++) {
	selectItems[i].addEventListener("click", function () {
		const selectedValue = this.innerText.toLowerCase();
		selectValue.innerText = this.innerText;
		elementToggleFunc(select);
		filterFunc(selectedValue);
	});
}

const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = (selectedValue) => {
	for (let i = 0; i < filterItems.length; i++) {
		if (selectedValue === "all") {
			filterItems[i].classList.add("active");
		} else if (selectedValue === filterItems[i].dataset.category) {
			filterItems[i].classList.add("active");
		} else {
			filterItems[i].classList.remove("active");
		}
	}
};

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
	filterBtn[i].addEventListener("click", function () {
		const selectedValue = this.innerText.toLowerCase();
		selectValue.innerText = this.innerText;
		filterFunc(selectedValue);

		lastClickedBtn.classList.remove("active");
		this.classList.add("active");
		lastClickedBtn = this;
	});
}

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
for (let i = 0; i < formInputs.length; i++) {
	formInputs[i].addEventListener("input", () => {
		// check form validation
		if (form.checkValidity()) {
			formBtn.removeAttribute("disabled");
		} else {
			formBtn.setAttribute("disabled", "");
		}
	});
}

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
	navigationLinks[i].addEventListener("click", function () {
		for (let i = 0; i < pages.length; i++) {
			if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
				pages[i].classList.add("active");
				navigationLinks[i].classList.add("active");
				window.scrollTo(0, 0);
			} else {
				pages[i].classList.remove("active");
				navigationLinks[i].classList.remove("active");
			}
		}
	});
}

function loadMap() {
	const mapContainer = document.getElementById("map-container");
	if (!mapContainer || mapContainer.querySelector("iframe")) return;

	const mapIframe = document.createElement("iframe");
	mapIframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15864.82800845161!2d106.86333518222808!3d-6.23642345002771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f30cd420b7a7%3A0xf3685407410d2862!2sCipinang%20Cempedak%2C%20Jatinegara%2C%20East%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1776245568189!5m2!1sen!2sid";
	mapIframe.width = "100%";
	mapIframe.height = "100%";
	mapIframe.style.border = "0";
	mapIframe.loading = "lazy";
	mapIframe.title = "Google Maps";
	
	mapContainer.appendChild(mapIframe);
}

document.querySelectorAll("[data-nav-link]").forEach(link => {
    link.addEventListener("click", function() {
        if (this.textContent.toLowerCase().includes("contact")) {
            setTimeout(loadMap, 100); 
        }
    });
});
/*==========================*\
    #End Halaman Project
\*==========================*/
