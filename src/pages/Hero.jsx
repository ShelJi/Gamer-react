import { useEffect, useState } from "react";
import Button from "../components/Button";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
	const [currentIndex, setCurrentIndex] = useState(1);
	const [bgSrc, setBgSrc] = useState(1);
	const [loading, setLoading] = useState(true);
	const [loadedVideos, setLoadedVideos] = useState(0);
	// const [hasClicked, setHasClicked] = useState(false);
	const totalVideos = 4;

	// setup loading
	const handleLoadedVideos = () => {
		setLoadedVideos((prev) => prev + 1);
	};
	useEffect(() => {
		if (loading) {
			document.body.style.overflow = "hidden";
			if (loadedVideos === totalVideos - 1) {
				setLoading(false);
			}
		} else {
			document.body.style.overflowY = "auto";
		}
	}, [loading, loadedVideos]);

	// get video src based on index
	const getVideoSrc = (index) => {
		return `videos/hero-${index}.mp4`;
	};

	// change bg video after delay
	useEffect(() => {
		const timeout = setTimeout(() => {
			setBgSrc(currentIndex);
		}, 800);
		return () => clearTimeout(timeout);
	}, [currentIndex]);

	// small video preview controller and to change current index
	const handleMinVideoClick = () => {
		setCurrentIndex((prev) => (prev % totalVideos) + 1);
	};

	// scroll animation
	useGSAP(() => {
		gsap.set("#video-frame", {
			clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
			borderRadius: "0% 0% 40% 10%",
		});
		gsap.from("#video-frame", {
			clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
			borderRadius: "0% 0% 0% 0%",
			ease: "power1.inOut",
			scrollTrigger: {
				trigger: "#video-frame",
				start: "center center",
				end: "bottom center",
				scrub: true,
			},
		});
	});

	//
	return (
		<div className="relative ">
			{loading && (
				<div className="fixed inset-0 h-dvh w-screen flex items-center justify-center z-[100] bg-violet-50 overflow-hidden">
					{/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
					<div className="three-body">
						<div className="three-body__dot"></div>
						<div className="three-body__dot"></div>
						<div className="three-body__dot"></div>
					</div>
				</div>
			)}
			<div id="video-frame" className="h-dvh w-screen relative ">
				<video
					key={`bg-${bgSrc}`}
					className="size-full object-cover object-center absolute z-0"
					autoPlay
					loop
					muted
					onLoadedData={handleLoadedVideos}
				>
					<source src={`${getVideoSrc(bgSrc)}#t=0.85`} type="video/mp4" />
				</video>
				<video
					key={currentIndex}
					src={getVideoSrc(currentIndex)}
					className="size-full object-cover object-center absolute animate-zoom-in z-10"
					autoPlay
					loop
					muted
					onLoadedData={handleLoadedVideos}
				></video>
				<div className="cursor-pointer" onClick={handleMinVideoClick}>
					<video
						src={getVideoSrc((currentIndex % totalVideos) + 1)}
						className="   z-20 absolute size-64 object-cover object-center top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-3xl opacity-0 scale-50 hover:opacity-100 hover:scale-125 transition-all duration-500 ease-in-out"
						autoPlay
						onLoadedData={handleLoadedVideos}
					></video>
				</div>
				<div>
					<div className="absolute left-15 top-[10%] ">
						<h1 className="special-font hero-heading text-blue-100 z-20 relative">
							redefi<b>n</b>e
						</h1>
						<div className=" font-robert-regular text-blue-100 z-20 relative ">
							<p>
								Enter the Metagame Layer <br /> Unleash the Play Economy
							</p>
							<Button
								id="watch-trailer"
								text="Watch Trailer"
								leftIcon={<MdOutlinePlaylistPlay />}
								btnClass={"bg-yellow-300 flex-center gap-1 z-20 mt-5"}
							/>
						</div>
					</div>
					<h1 className="absolute right-15 bottom-0 special-font hero-heading text-blue-75 z-20">
						G<b>a</b>ming
					</h1>
				</div>
			</div>
			<h1 className="absolute right-15 bottom-0 special-font hero-heading text-black z-[-10]">
				G<b>a</b>ming
			</h1>
		</div>
	);
};

export default Hero;
