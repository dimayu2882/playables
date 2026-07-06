const playableModal = document.querySelector(".playable-modal");
const playableIframe = document.querySelector(".playable-modal__iframe");
let playableCloseTimeout = null;

function getScrollbarWidth() {
	return window.innerWidth - document.documentElement.clientWidth;
}

function openPlayableModal(url) {
	if (!playableModal || !playableIframe) return;

	clearTimeout(playableCloseTimeout);
	playableIframe.src = url;
	playableModal.classList.remove("playable-modal--closing");
	playableModal.classList.add("playable-modal--open");
	playableModal.setAttribute("aria-hidden", "false");

	const scrollbarWidth = getScrollbarWidth();
	document.body.style.paddingRight = scrollbarWidth ? `${scrollbarWidth}px` : "";
	document.body.classList.add("modal-open");
}

function closePlayableModal() {
	if (!playableModal || !playableIframe || !playableModal.classList.contains("playable-modal--open")) return;

	clearTimeout(playableCloseTimeout);
	playableModal.classList.add("playable-modal--closing");
	playableModal.setAttribute("aria-hidden", "true");

	playableCloseTimeout = setTimeout(function () {
		playableModal.classList.remove("playable-modal--open", "playable-modal--closing");
		playableIframe.removeAttribute("src");
		document.body.classList.remove("modal-open");
		document.body.style.paddingRight = "";
	}, 250);
}

document.addEventListener("click", function (event) {
	const playable = event.target.closest(".playables__item");

	if (playable && playableModal && playableIframe) {
		event.preventDefault();
		openPlayableModal(playable.href);
		return;
	}

	if (event.target.closest("[data-playable-close]")) {
		closePlayableModal();
	}
});

document.addEventListener("keydown", function (event) {
	if (event.key === "Escape") {
		closePlayableModal();
	}
});
