const IsSmallMobile = window.innerWidth < 400;
const IsMediumMobile = window.innerWidth >= 400 && window.innerWidth <= 550;
const IsMobile = window.innerWidth < 769 && !IsSmallMobile && !IsMediumMobile;
const IsMedium = window.innerWidth < 1025 && !IsMobile && !IsSmallMobile;
const IsLaptope =
	window.innerWidth < 1441 && !IsMobile && !IsSmallMobile && !IsMedium;
const IsBigScreen =
	window.innerWidth > 2000 &&
	!IsMobile &&
	!IsSmallMobile &&
	!IsMedium &&
	!IsLaptope;
if ("scrollRestoration" in history) {
	history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

window.addEventListener("DOMContentLoaded", () => {
	gsap.registerPlugin(ScrollTrigger, SplitText);

	const lenis = new Lenis({
		duration: 3,
		easing: (t) => 1 - Math.pow(1 - t, 3),
		smoothWheel: true,
		smoothTouch: false,
	});

	lenis.on("scroll", () => ScrollTrigger.update());

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);

	const heroTitle = new SplitText(".hero__title", { type: "words" });
	const heroTitleSpan = new SplitText(".hero__title-span", { type: "words" });
	heroTitle.words.forEach((char) => char.classList.add("gradient-text"));
	heroTitleSpan.words.forEach((char) => char.classList.add("gradient-text"));

	gsap
		.timeline()
		.from("#metallica-guitar", {
			opacity: 0,
			xPercent: -200,
			duration: 1.4,
			ease: "power1.out",
		})
		.from(heroTitle.words, {
			opacity: 0,
			y: 220,
			stagger: 0.15,
			duration: 1.2,
			ease: "back.out(1.7)",
		})
		.from(heroTitleSpan.words, {
			opacity: 0,
			y: 220,
			stagger: 0.15,
			duration: 1,
			ease: "back.out(1.7)",
		});

	const heroTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: ".hero__section",
			start: "10% top",
			end: IsSmallMobile
				? "bottom 10%"
				: IsMediumMobile
				? "bottom 25%"
				: IsMobile
				? "bottom 35%"
				: "bottom 5%",
			scrub: 1,
		},
	});

	heroTimeline.to("#metallica-guitar", {
		yPercent: IsSmallMobile
			? "+=360"
			: IsMediumMobile
			? "+=385"
			: IsMobile
			? "+=240"
			: IsLaptope
			? "+=210"
			: "+=200",
		scale: IsLaptope ? 0.6 : IsMobile ? 0.8 : 0.7,
		rotation: -90,
		transformOrigin: "center center",
	});

	const espInfoTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: "#esp__info-section",
			start: IsMediumMobile
				? "top 40%"
				: IsMobile
				? "top 25%"
				: IsMedium
				? "top 35%"
				: "top 8%",
			end: "10% 10%",
		},
	});

	espInfoTimeline
		.from("#esp__dis", {
			xPercent: -50,
			opacity: 0,
		})
		.from("#esp__photo img", {
			xPercent: 50,
			opacity: 0,
			stagger: 0.2,
		});
	let videoPlayed = false;
	const metallicaVideo = document.getElementById("metallica-video");
	metallicaVideo.muted = true;
	metallicaVideo
		.play()
		.then(() => {
			metallicaVideo.pause();
			metallicaVideo.currentTime = 0;
		})
		.catch((err) => console.log("Не удалось запустить видео:", err));

	const guitarToTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: "#section__video-metallica",
			start: IsSmallMobile
				? "5% 75%"
				: IsMediumMobile
				? "5% 75%"
				: IsMobile
				? "5% 85%"
				: "5% bottom",
			end: IsSmallMobile
				? "top 22%"
				: IsMediumMobile
				? "top 20%"
				: IsMobile
				? "top 15%"
				: IsLaptope
				? "10% 25%"
				: "top top",
			scrub: 1,
			onUpdate: (self) => {
				if (self.progress >= 1 && !videoPlayed) {
					gsap.to(guitar, { opacity: 0, duration: 0.3 });
					metallicaVideo.currentTime = 0;
					guitar.style.pointerEvents = "none";
					metallicaVideo.play();
					videoPlayed = true;
				} else if (self.progress <= 0.8) {
					gsap.to(guitar, { opacity: 1, duration: 0.3 });
					guitar.style.pointerEvents = "auto";
					metallicaVideo.pause();
					metallicaVideo.currentTime = 0;
					videoPlayed = false;
				}
			},
		},
	});

	guitarToTimeline.to("#metallica-guitar", {
		yPercent: IsSmallMobile
			? "+=305"
			: IsMediumMobile
			? "+=320"
			: IsMobile
			? "+=325"
			: IsMedium
			? "+=240"
			: IsBigScreen || IsLaptope
			? "+=210"
			: "+=260",
		scale:
			IsMediumMobile || IsSmallMobile
				? 1
				: IsLaptope
				? 0.6
				: IsMedium
				? 0.5
				: 0.7,
		rotation: -40,

		x: 60,
		onStart: () => {
			const guitar = document.getElementById("metallica-guitar");

			if (guitar.classList.contains("black")) {
				guitar.src = "./img/espWhite.png";
				guitar.classList.remove("black");
			}
		},
	});

	//==== MEGADEATH

	const heroTitleMegadeath = new SplitText(".hero__title-megadeath", {
		type: "chars",
	});
	const heroTitleMegadeathSpan = new SplitText(".hero__title-span-megadeath", {
		type: "words",
	});
	heroTitleMegadeath.chars.forEach((char) =>
		char.classList.add("gradient-megadeath")
	);
	heroTitleMegadeathSpan.words.forEach((char) =>
		char.classList.add("gradient-megadeath")
	);

	gsap
		.timeline({
			scrollTrigger: {
				trigger: "#section__hero-megadeath",
				start: "top 25%",
				end: "top top",
				toggleActions: "play play play reverse",
			},
		})
		.from("#megadeath-guitar", {
			opacity: 0,
			xPercent: 200,
			duration: 1,
			ease: "power1.out",
		})
		.from(heroTitleMegadeath.chars, {
			opacity: 0,
			y: 220,
			stagger: 0.04,
			duration: 0.6,
			ease: "back.out(1.7)",
		})
		.from(heroTitleMegadeathSpan.words, {
			opacity: 0,
			x: 220,
			duration: 1,
			ease: "back.out(1.7)",
		});

	const MegadeathHeroTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: "#section__hero-megadeath",
			start: "10% top",
			end: IsSmallMobile
				? "bottom 10%"
				: IsMediumMobile
				? "bottom 25%"
				: IsMobile
				? "bottom 35%"
				: "bottom 12%",
			scrub: 1,
		},
	});

	MegadeathHeroTimeline.to("#megadeath-guitar", {
		yPercent: IsSmallMobile
			? "+=360"
			: IsMediumMobile
			? "+=380"
			: IsMobile
			? "+=290"
			: IsLaptope
			? "+=210"
			: "+=220",
		scale: IsLaptope ? 0.6 : IsMobile ? 0.8 : 0.7,
		rotation: -90,
		transformOrigin: "center center",
	});
	MegadeathHeroTimeline.to(
		[".hero__title-span-megadeath", ".hero__title-megadeath"],
		{
			yPercent: 20,
		},
		"<"
	);
	const JacksonInfoTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: "#jackson__info-section",
			start: IsMediumMobile ? "top 40%" : IsMobile ? "top 25%" : "top 45%",
			end: "10% 10%",
		},
	});

	JacksonInfoTimeline.from("#jackson__dis", {
		xPercent: -50,
		opacity: 0,
	}).from("#jackson__photo img", {
		xPercent: 50,
		opacity: 0,
		stagger: 0.2,
	});

	let megadeathVideoPlayed = false;
	const megadeathGuitar = document.getElementById("megadeath-guitar");
	const megadeathVideo = document.getElementById("megadeath-video");

	megadeathVideo.muted = true;
	megadeathVideo
		.play()
		.then(() => {
			megadeathVideo.pause();
			megadeathVideo.currentTime = 0;
		})
		.catch((err) => console.log("Не удалось запустить видео:", err));
	const MegadeathGuitarToTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: "#section__video-megadeath",
			start: IsSmallMobile
				? "5% 75%"
				: IsMediumMobile
				? "5% 75%"
				: IsMobile
				? "5% 85%"
				: "5% bottom",
			end: IsSmallMobile
				? "top 22%"
				: IsMediumMobile
				? "top 20%"
				: IsMobile
				? "top 15%"
				: IsLaptope
				? "10% 30%"
				: IsBigScreen
				? "top 5%"
				: "top 10%",
			scrub: 1,
			onUpdate: (self) => {
				if (self.progress >= 1 && !megadeathVideoPlayed) {
					gsap.to(megadeathGuitar, { opacity: 0, duration: 0.3 });
					megadeathGuitar.style.pointerEvents = "none";
					megadeathVideo.currentTime = 0;
					megadeathVideo.play();
					megadeathVideoPlayed = true;
				} else if (self.progress <= 0.8) {
					gsap.to(megadeathGuitar, { opacity: 1, duration: 0.3 });
					megadeathGuitar.style.pointerEvents = "auto";
					megadeathVideo.pause();
					megadeathVideo.currentTime = 0;
					megadeathVideoPlayed = false;
				}
			},
		},
	});
	MegadeathGuitarToTimeline.to("#megadeath-guitar", {
		yPercent: IsSmallMobile
			? "+=305"
			: IsMediumMobile
			? "+=310"
			: IsMobile
			? "+=325"
			: IsMedium
			? "+=240"
			: IsBigScreen || IsLaptope
			? "+=245"
			: "+=235",
		scale:
			IsMediumMobile || IsSmallMobile
				? 1
				: IsLaptope
				? 0.6
				: IsMedium
				? 0.6
				: 0.8,
		xPercent: -52,
		rotation: -54,
		transformOrigin: "center center",
		onStart: () => {
			if (megadeathGuitar.classList.contains("black")) {
				megadeathGuitar.src = "./img/mega.png";
				megadeathGuitar.classList.remove("black");
			}
		},
		onComplete: () => {
			megadeathGuitar.style.opacity = 0;
		},
	});

	//=========== PANTERA

	const heroTitlePantera = new SplitText(".panter-hero__title", {
		type: "words",
	});
	const heroTitlePanteraSpan = new SplitText(".pantera-hero__title-span", {
		type: "words",
	});
	gsap
		.timeline({
			scrollTrigger: {
				trigger: "#pantera-hero__section",
				start: "top 25%",
				end: "top top",
				toggleActions: "play play play reverse",
			},
		})
		.from("#pantera-guitar", {
			opacity: 0,
			xPercent: -200,
			duration: 1,
			ease: "power1.out",
		})
		.from(heroTitlePantera.words, {
			opacity: 0,
			y: -320,
			stagger: 0.04,
			duration: 0.6,
			ease: "back.out(1.7)",
		})
		.from(heroTitlePanteraSpan.words, {
			opacity: 0,
			y: 320,
			duration: 1,
			ease: "back.out(1.7)",
		});

	const PanteraHeroTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: "#pantera-hero__section",
			start: "10% top",
			end: IsSmallMobile
				? "bottom 10%"
				: IsMediumMobile
				? "bottom 25%"
				: IsMobile
				? "bottom 35%"
				: "bottom 12%",
			scrub: 1,
		},
	});

	PanteraHeroTimeline.to("#pantera-guitar", {
		yPercent: IsSmallMobile
			? "+=150"
			: IsMediumMobile
			? "+=160"
			: IsMobile
			? "+=120"
			: IsLaptope
			? "+=80"
			: IsBigScreen
			? "+=90"
			: "+=75",
		scale: IsLaptope
			? 0.6
			: IsMobile
			? 0.8
			: IsMediumMobile || IsSmallMobile
			? 0.7
			: 0.5,
		rotation: 0,
		transformOrigin: "center center",
		markers: true,
	});

	const DeanInfoTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: "#dean-info__section",
			start: IsMediumMobile ? "top 40%" : IsMobile ? "top 25%" : "top 45%",
			end: "10% 10%",
			markers: false,
		},
	});

	DeanInfoTimeline.from("#dean__dis", {
		xPercent: -50,
		opacity: 0,
	}).from("#dean__photo img", {
		xPercent: 50,
		opacity: 0,
		stagger: 0.2,
	});

	let panteraVideoPlayed = false;
	const panteraGuitar = document.getElementById("pantera-guitar");
	const panteraVideo = document.getElementById("pantera-video");

	panteraVideo.muted = true;
	panteraVideo
		.play()
		.then(() => {
			panteraVideo.pause();
			panteraVideo.currentTime = 0;
		})
		.catch((err) => console.log("Не удалось запустить видео:", err));
	const PanteraGuitarToTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: "#section__video-pantera",
			start: IsSmallMobile
				? "5% 90%"
				: IsMediumMobile
				? "5% bottom"
				: IsMobile
				? "5% 85%"
				: "5% bottom",
			end: IsSmallMobile
				? "top 22%"
				: IsMediumMobile
				? "top 20%"
				: IsMobile
				? "top 15%"
				: IsLaptope
				? "10% 30%"
				: IsBigScreen
				? "top 5%"
				: "top 10%",
			scrub: 1,
			onUpdate: (self) => {
				if (self.progress >= 1 && !panteraVideoPlayed) {
					gsap.to(panteraGuitar, { opacity: 0, duration: 0.3 });
					panteraGuitar.style.pointerEvents = "none";
					panteraVideo.currentTime = 0;
					panteraVideo.play();
					panteraVideoPlayed = true;
				} else if (self.progress <= 0.8) {
					gsap.to(panteraGuitar, { opacity: 1, duration: 0.3 });
					panteraGuitar.style.pointerEvents = "auto";
					panteraVideo.pause();
					panteraVideo.currentTime = 0;
					panteraVideoPlayed = false;
				}
			},
		},
	});
	PanteraGuitarToTimeline.to("#pantera-guitar", {
		yPercent: IsSmallMobile
			? "+=160"
			: IsMediumMobile
			? "+=170"
			: IsMobile
			? "+=110"
			: IsMedium
			? "+=75"
			: IsLaptope
			? "+=70"
			: IsBigScreen
			? "+=90"
			: "+=82",
		scale:
			IsMediumMobile || IsSmallMobile
				? 0.8
				: IsMobile
				? 0.6
				: IsLaptope
				? 0.7
				: IsMedium
				? 0.6
				: IsBigScreen
				? 1
				: 0.8,
		xPercent: IsBigScreen ? 0 : IsMedium ? -25 : -20,
		rotation: 50,
		transformOrigin: "center center",
		onStart: () => {
			if (panteraGuitar.classList.contains("black")) {
				panteraGuitar.src = "./img/pantera333.png";
				panteraGuitar.classList.remove("black");
			}
		},
		onComplete: () => {
			panteraGuitar.style.opacity = 0;
		},
	});

	//===== CHANGE COLOR === //
	const guitar = document.getElementById("metallica-guitar");

	guitar.addEventListener("click", () => {
		gsap.to(guitar, {
			opacity: 0,
			duration: 0.3,
			onComplete: () => {
				if (guitar.classList.contains("black")) {
					guitar.src = "./img/espWhite.png";
					guitar.classList.remove("black");
				} else {
					guitar.src = "./img/espBlack.png";
					guitar.classList.add("black");
				}

				gsap.to(guitar, { opacity: 1, duration: 0.3 });
			},
		});
	});
	megadeathGuitar.addEventListener("click", () => {
		gsap.to(megadeathGuitar, {
			opacity: 0,
			duration: 0.3,
			onComplete: () => {
				if (megadeathGuitar.classList.contains("black")) {
					megadeathGuitar.src = "./img/mega.png";
					megadeathGuitar.classList.remove("black");
				} else {
					megadeathGuitar.src = "./img/megadeathwhite.png";
					megadeathGuitar.classList.add("black");
				}

				gsap.to(megadeathGuitar, { opacity: 1, duration: 0.3 });
			},
		});
	});
	panteraGuitar.addEventListener("click", () => {
		gsap.to(panteraGuitar, {
			opacity: 0,
			duration: 0.3,
			onComplete: () => {
				if (panteraGuitar.classList.contains("black")) {
					panteraGuitar.src = "./img/pantera333.png";
					panteraGuitar.classList.remove("black");
				} else {
					panteraGuitar.src = "./img/pantera-removebg-preview.png";
					panteraGuitar.classList.add("black");
				}

				gsap.to(panteraGuitar, { opacity: 1, duration: 0.3 });
			},
		});
	});

	const mutedButton = document.getElementById("muted__button");
	const mutedButtonIcon = document.getElementById("muted__button-icon");
	const volumeSlider = document.getElementById("volume-slider");

	let currentVolume = 0.1;
	let currentSong = null;
	const songName = document.querySelector(".song-name");
	const tracks = {
		metallica: document.getElementById("metallica-song"),
		megadeath: document.getElementById("megadeath-song"),
		pantera: document.getElementById("pantera-song"),
	};

	Object.values(tracks).forEach((track) => {
		track.volume = 0;
		track.pause();
	});

	let started = false;
	document.addEventListener("click", () => {
		if (!started) {
			Object.values(tracks).forEach((track) => {
				track.muted = true;
				track.play();
				track.pause();
				track.currentTime = 0;
				track.muted = false;
			});

			const groups = ["metallica", "megadeath", "pantera"];
			let activeGroup = groups[0];

			groups.forEach((group) => {
				const el = document.querySelector(`.${group}-group`);
				const rect = el.getBoundingClientRect();
				if (
					rect.top < window.innerHeight / 2 &&
					rect.bottom > window.innerHeight / 2
				) {
					activeGroup = group;
				}
			});

			crossfade(activeGroup);

			started = true;
		}
	});

	function crossfade(toPlay) {
		Object.entries(tracks).forEach(([name, track]) => {
			if (name === toPlay) {
				currentSong = track;
				if (track.paused) track.play();

				songName.textContent =
					name === "metallica"
						? "Metallica - Muster Of Puppets"
						: name === "megadeath"
						? "Megadeath - Holy Wars"
						: "Pantera - Domination";

				gsap.to(track, {
					volume: currentVolume,
					duration: 1.5,
					ease: "power2.out",
				});
			} else {
				gsap.to(track, {
					volume: 0,
					duration: 1.5,
					ease: "power2.out",
					onComplete: () => track.pause(),
				});
			}
		});
	}

	["metallica", "megadeath", "pantera"].forEach((group) => {
		ScrollTrigger.create({
			trigger: `.${group}-group`,
			start: "top center",
			end: "bottom center",
			onEnter: () => crossfade(group),
			onEnterBack: () => crossfade(group),
		});
	});

	mutedButton.addEventListener("click", () => {
		if (currentSong) {
			if (currentVolume === 0 && currentSong.muted) {
				return;
			}
			currentSong.muted = !currentSong.muted;
			mutedButtonIcon.src = currentSong.muted
				? "./img/volumeIconOff.png"
				: "./img/volumeIcon.png";
		}
	});

	volumeSlider.addEventListener("input", (e) => {
		currentVolume = parseFloat(e.target.value);

		if (currentSong) {
			if (currentSong.muted) {
				currentSong.muted = false;
				mutedButtonIcon.src = "./img/volumeIcon.png";
			}
			currentSong.volume = currentVolume;

			if (currentVolume === 0) {
				currentSong.muted = true;
				mutedButtonIcon.src = "./img/volumeIconOff.png";
			} else {
				currentSong.muted = false;
				mutedButtonIcon.src = "./img/volumeIcon.png";
			}
		}
	});
	const slider = document.getElementById("volume-slider");

	function updateBackground() {
		const value =
			((slider.value - slider.min) / (slider.max - slider.min)) * 100;
		slider.style.background = `linear-gradient(to right, #fff ${value}%, #000 ${value}%)`;
	}

	slider.addEventListener("input", updateBackground);
	updateBackground();
});
