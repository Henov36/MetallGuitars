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
// const displayHeight = window.innerHeight < 850;

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
			// pin: true,
			// markers: true,
		},
	});

	heroTimeline.to("#metallica-guitar", {
		yPercent: IsSmallMobile
			? "+=360"
			: IsMediumMobile
			? "+=400"
			: IsMobile
			? "+=350"
			: "+=200",
		scale: IsLaptope ? 0.6 : IsMobile ? 0.8 : 0.7,
		rotation: -90,
		transformOrigin: "center center",
		// pin: true,
	});

	const espInfoTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: "#esp__info-section",
			start: IsMediumMobile ? "top 40%" : IsMobile ? "top 25%" : "top 8%",
			end: "10% 10%",
			// scrub: 1,
			// pin: true,
			// markers: true,
		},
	});

	espInfoTimeline
		.from(".esp__dis", {
			xPercent: -50,
			opacity: 0,
			// pin: true,
		})
		.from(".esp__photo img", {
			xPercent: 50,
			opacity: 0,
			stagger: 0.2,
		});
	let videoPlayed = false;
	const metallicaVideo = document.getElementById("metallica-video");
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
				? "10% 30%"
				: "top top",
			scrub: 1,
			// pin: true,
			markers: true,
			onUpdate: (self) => {
				// if (self.progress >= 0.95) {
				// 	gsap.to(guitar, { opacity: 0, duration: 0.3 });
				// 	metallicaVideo.currentTime = 0;
				// 	metallicaVideo.play();
				// 	videoPlayed = true;
				// } else if (self.progress <= 0.8) {
				// 	gsap.to(guitar, { opacity: 1, duration: 0.3 });
				// 	metallicaVideo.pause();
				// 	metallicaVideo.currentTime = 0;
				// 	videoPlayed = false;
				// } else {
				// }
				if (self.progress >= 1 && !videoPlayed) {
					gsap.to(guitar, { opacity: 0, duration: 0.3 });
					metallicaVideo.currentTime = 0;
					metallicaVideo.play();
					videoPlayed = true;
				} else if (self.progress <= 0.8) {
					gsap.to(guitar, { opacity: 1, duration: 0.3 });
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
		// transformOrigin: "center center",
		onStart: () => {
			const guitar = document.getElementById("metallica-guitar");
			if (guitar.classList.contains("black")) {
				guitar.src = "./img/espWhite.png";
				guitar.classList.remove("black");
			}
		},
		// onComplete: () => {
		// 	// как только доходим до конца анимации — запускаем видео
		// 	// guitar.style.opacity = 0;
		// },
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
	const song = document.getElementById("metallica-song");
	const mutedButton = document.getElementById("muted__button");
	const volumeUpButton = document.getElementById("volume-up");
	const volumeDownButton = document.getElementById("volume-down");

	document.addEventListener(
		"click",
		() => {
			song.volume = 0.1;
			song.play();
		},
		{ once: true }
	);

	mutedButton.addEventListener("click", () => {
		song.muted = !song.muted;
		mutedButton.textContent = song.muted ? "🔇" : "🔊";
	});

	volumeUpButton.addEventListener("click", () => {
		if (song.volume < 1) {
			song.volume = Math.min(song.volume + 0.1, 1);
		}
	});

	volumeDownButton.addEventListener("click", () => {
		if (song.volume > 0) {
			song.volume = Math.max(song.volume - 0.1, 0);
		}
	});

	// const hero = document.getElementById("hero__section");
	// const title = document.querySelector(".hero__title");

	// hero.addEventListener("mousemove", (e) => {
	// 	const rect = hero.getBoundingClientRect();
	// 	const x = e.clientX - rect.left;
	// 	const y = e.clientY - rect.top;

	// 	const centerX = rect.width / 2;
	// 	const centerY = rect.height / 2;

	// 	const rotateX = ((y - centerY) / centerY) * 15;
	// 	const rotateY = ((x - centerX) / centerX) * 15;

	// 	title.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
	// });

	// hero.addEventListener("mouseleave", () => {
	// 	title.style.transform = `rotateX(0deg) rotateY(0deg)`;
	// });
});
