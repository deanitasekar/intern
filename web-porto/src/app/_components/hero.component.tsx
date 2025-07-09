'use client';

import Image from 'next/image'
import React from "react"
import Link from 'next/link'

const Hero = () => {
	return (
		<section className="bg-black bg-cover bg-center bg-no-repeat">
			<div className="max-w-5xl px-4 py-16 mx-auto my-12">
				<div className="grid lg:grid-cols-2 gap-10 items-center">
					<div className="order-1 lg:order-1">
						<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-white">
							Your Name Here
						</h1>

						<p className="mb-6 font-light text-gray-400 lg:mb-8 md:text-lg lg:text-xl leading-relaxed">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						</p>

						<Link href="#" className="group inline-flex items-center justify-center px-8 py-4 text-base font-medium text-center bg-lime-600 hover:bg-lime-800 border border-lime-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25">
							Lets get started
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
							</svg>
						</Link>
					</div>
					
					<div className="order-2 lg:order-2 flex justify-center lg:justify-end">
						<div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
							<Image 
								src="/hero.png"
								alt="Hero image" 
								fill
								className="object-cover rounded-full shadow-lg"
								priority
							/>
						</div>
					</div>
				</div>

				<div className="mt-12">
					<div className="text-left">
						<p className="text-gray-400 text-lg font-light mb-6">
							Worked with
						</p>
						<div className="w-full">
							<Image 
								src="/product.png"
								alt="Product logos" 
								width={1200}
								height={150}
								className="w-full h-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;