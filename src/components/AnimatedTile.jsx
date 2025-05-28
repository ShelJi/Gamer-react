import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import PropTypes from "prop-types";

const AnimatedTile = ({ title, containerClass }) => {
	const containerRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const titleAnimation = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: "100 bottom",
					end: "center bottom",
					toggleActions: "play none none reverse",
				},
			});

			titleAnimation.to(
				".animated-word",
				{
					opacity: 1,
					transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
					ease: "power2.inOut",
					stagger: 0.02,
				},
				0
			);
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<div ref={containerRef} className={`animated-title ${containerClass}`}>
			{title.split("<br />").map((line, index) => (
				<div
					key={index}
					className="flex justify-center items-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
				>
					{line.split(" ").map((word, idx) => (
						<span
							className="animated-word"
							key={idx}
							dangerouslySetInnerHTML={{ __html: word }}
						></span>
					))}
				</div>
			))}
		</div>
	);
};

export default AnimatedTile;

AnimatedTile.propTypes = {
	title: PropTypes.string,
	containerClass: PropTypes.string,
};

AnimatedTile.defaultProps = {
	title: "Hello World",
	containerClass: "",
};
