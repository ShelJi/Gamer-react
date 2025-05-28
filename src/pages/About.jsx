import { useGSAP } from "@gsap/react";
import AnimatedTile from "../components/AnimatedTile";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
	useGSAP(() => {
		const clipAnimation = gsap.timeline({
			scrollTrigger: {
				trigger: "#clip",
				start: "center center",
				end: "+=800 center",
				scrub: 0.5,
				pin: true,
				pinSpacing: true,
			},
		});

		clipAnimation.to("#about-img", {
			width: "100vw",
			height: "100vh",
			borderRadius: 0,
		});
	});

	return (
		<div id="about" className="min-h-dvh mt-5">
			<div className="my-3.5 relative">
				<h2 className="text-center my-10 text-2xl">Welcome to zentry</h2>
				<AnimatedTile
					title="Disc<b>o</b>ver the w<b>o</b>rld's <br /> larg<b>e</b>st shared <b>a</b>dventure"
					containerClass="text-center"
				/>
				<div className="absolute bottom-[-80dvh] left-1/2 w-full max-w-96 -translate-x-1/2 text-center font-circular-web text-lg md:max-w-[34rem]">
					<p>The Game of Games begins—your life, now an epic MMORPG</p>
					<p className="text-gray-500">
						Zentry unites every player from countless games and platforms, both digital
						and physical, into a unified Play Economy
					</p>
				</div>
			</div>

			<div className="relative left-0 h-dvh w-screen flex flex-col items-center" id="clip">
				<div id="about-img" className="mask-clip-path absolute left-1/2 top-0 z-20 h-[60vh] w-96 origin-center -translate-x-1/2 overflow-hidden rounded-3xl md:w-[30vw]">
					<img
						className="size-full object-cover "
						src="img/about.webp"
						alt="background"
					/>
				</div>
			</div>
		</div>
	);
};

export default About;
