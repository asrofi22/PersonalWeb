/*=========================================================================*\
 Navigasi  di refresh tetap berada di class active sesuai hastagnya #...
\*=========================================================================*/

document.addEventListener("DOMContentLoaded", () => {
	function navigateToSection() {
		var hash = window.location.hash.substr(1); // Mengambil nilai hash tanpa '#'

		// Menghilangkan class 'active' dari semua bagian
		document.querySelectorAll("[data-page]").forEach((section) => {
			section.classList.remove("active");
		});

		// Jika tidak ada hash, gunakan default 'about' sebagai hash
		if (!hash) {
			hash = "about"; // Default ke 'about' jika tidak ada hash
			window.location.hash = "#" + hash; // Opsional: Tambahkan #about ke URL
		}

		var targetSection = document.querySelector('[data-page="' + hash + '"]');
		if (targetSection) {
			targetSection.classList.add("active");
		}

		// Menyesuaikan navigasi berdasarkan hash
		document.querySelectorAll(".navbar-link").forEach((link) => {
			if (link.getAttribute("href") === "#" + hash) {
				// Menambahkan class 'active' pada link navigasi yang sesuai
				document
					.querySelectorAll(".navbar-link")
					.forEach((link) => link.classList.remove("active"));
				link.classList.add("active");
			}
		});
	}

	// Menangani perubahan hash
	window.addEventListener("hashchange", navigateToSection);

	// Panggil fungsi saat halaman dimuat
	navigateToSection();
});

/*======================*\
  #End Navigasi Active
\*======================*/

// element toggle function
const elementToggleFunc = (elem) => {
	elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", () => {
	elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Seleksi elemen sertifikat
document.querySelectorAll(".project-item").forEach((item) => {
	item.addEventListener("click", function () {
		// Mendapatkan data dari item yang diklik
		const imgSrc = this.querySelector("img").src;
		const title = this.querySelector(".project-title").textContent;
		const category = this.querySelector(".project-category").textContent;

		// Menetapkan data ke modal
		document.getElementById("modalImg").src = imgSrc;
		document.getElementById("modalTitle").textContent = title;
		document.getElementById("modalCategory").textContent = category;

		// Menampilkan modal
		document.getElementById("certificateModal").style.display = "block";
	});
});

// Ketika pengguna mengklik tombol close (x), tutup modal
document.querySelector(".close-button").addEventListener("click", () => {
	document.getElementById("certificateModal").style.display = "none";
});

// Juga bisa menambahkan fungsi untuk menutup modal jika pengguna mengklik di luar konten modal
window.onclick = (event) => {
	const modal = document.getElementById("certificateModal");
	if (event.target == modal) {
		modal.style.display = "none";
	}
};

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
	elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
	selectItems[i].addEventListener("click", function () {
		const selectedValue = this.innerText.toLowerCase();
		selectValue.innerText = this.innerText;
		elementToggleFunc(select);
		filterFunc(selectedValue);
	});
}

// filter variables
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

// add event in all filter button items for large screen
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

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
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

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
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

/*==========================*\
    #Halaman Project Saya
\*==========================*/
// Fungsi untuk memuat peta secara lazy loading
function lazyLoadMap() {
	const mapContainer = document.getElementById("map-container");
	const mapIframe = document.createElement("iframe");
	mapIframe.src =
		"https://www.google.com/maps?q=Bayung+Lencir+South+Sumatra&output=embed";
	mapIframe.width = "400";
	mapIframe.height = "300";
	mapIframe.loading = "lazy";
	mapContainer.appendChild(mapIframe);
}

// Mendeteksi ketika kontainer peta terlihat di viewport
function isMapVisible() {
	const mapContainer = document.getElementById("map-container");
	const rect = mapContainer.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

// Memuat peta ketika kontainer terlihat di viewport
window.addEventListener("scroll", () => {
	if (isMapVisible()) {
		lazyLoadMap();
		window.removeEventListener("scroll", arguments.callee);
	}
});
/*==========================*\
    #End Halaman Project
\*==========================*/
