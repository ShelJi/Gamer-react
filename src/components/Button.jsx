import React from "react";

const Button = ({ id, text, leftIcon, rightIcon, btnClass }) => {
	return (
		<div>
			<button
				id={id}
				className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${btnClass}`}
			>
				<span className="inline-block align-middle">{leftIcon}</span>

				<span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
					<div className="translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12">
						{text}
					</div>
					<div className="absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0">
						{text}
					</div>
				</span>

				<span className="inline-block align-middle px-0.5">{rightIcon}</span>
			</button>
		</div>
	);
};

export default Button;
