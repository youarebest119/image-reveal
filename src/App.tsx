import lion from "./assets/lion.jpg";
import dog from "./assets/dog.jpg";
import cat from "./assets/cat.jpg";
import giraffe from "./assets/giraffe.jpg";
import { MouseEvent, useState } from "react";
import { motion, useSpring } from "framer-motion";

function App() {
	const [img, setImg] = useState({
		src: "",
		alt: "",
		opacity: 0,
	})
	const list = [
		{
			img: lion,
			label: "Lion",
		},
		{
			img: dog,
			label: "Dog",
		},
		{
			img: cat,
			label: "Cat",
		},
		{
			img: giraffe,
			label: "Giraffe",
		},
	];
	const spring = {
		stiffness: 150,
		damping: 15,
		mass: 0.1,
	}
	const imagePos = {
		x: useSpring(0, spring),
		y: useSpring(0, spring),
	}

	const handleMove = (e: MouseEvent<HTMLDivElement>) => {
		const { clientX, clientY } = e;
		imagePos.x.set(clientX);
		imagePos.y.set(clientY);
	}
	return (
		<>
			<section onMouseMove={handleMove} className="image_reveal">
				<ul>
					{
						list.map(item => {
							return (
								<li
									key={item.label}
									onMouseEnter={() => {
										setImg({
											src: item.img,
											alt: item.label,
											opacity: 1,
										})
									}}
									onMouseLeave={() => {
										setImg({
											src: item.img,
											alt: item.label,
											opacity: 0,
										})
									}}
								>
									{item.label}
								</li>
							)
						})
					}
				</ul>
				<motion.img
					src={img.src}
					alt={img.alt}
					className="hovered_img"
					style={{
						y: imagePos.y,
						x: imagePos.x,
						opacity: img.opacity,
					}}
				/>
			</section>
		</>
	)
}

export default App
