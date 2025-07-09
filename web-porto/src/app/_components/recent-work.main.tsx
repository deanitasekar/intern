'use client';

import Image from 'next/image';
import React from "react";
import Link from 'next/link';

const RecentWork = () => {
	return (
		<section id="recent-work" className="bg-white bg-cover bg-center bg-no-repeat min-h-screen">
			<div className="grid max-w-5xl px-4 py-8 mx-auto">
				<div className="text-center max-w-3xl mx-auto my-12">
					<h2 className="mb-4 text-4xl font-bold md:text-5xl xl:text-5xl text-black items-center text-center relative">
						Recent Work
					</h2>

					<p className="my-4 mb-6 text-gray-400 lg:mb-8 md:text-base lg:text-lg items-center text-center leading-relaxed">
						Solving user & business problems since last 15+ years. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
					</p>
				</div>

				<div className="relative">
					<button className="absolute -left-28 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-50">
						<svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
						</svg>
					</button>
					
					<button className="absolute -right-28 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-50">
						<svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
						</svg>
					</button>

					<div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
						<div className="order-1 lg:order-1">
							<div className="relative w-full h-[300px] lg:h-[400px]">
								<Image
								src="/work-1.png"
								alt="Recent work image"
								fill
								className="object-cover rounded-lg shadow-lg"
								priority
								/>
							</div>

							<h3 className="text-3xl md:text-4xl font-bold text-black mt-6">
								Work name here
							</h3>

							<p className="my-2 text-gray-500 text-lg leading-relaxed mb-8">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore.
							</p>

							<Link href="#" className="group inline-flex items-center justify-center text-base font-semibold text-center bg-lime-600 hover:bg-lime-800 border border-lime-500 text-white px-6 py-3 rounded-lg transition-colors duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
								Know more
								<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
								</svg>
							</Link>
						</div>

						<div className="order-2 lg:order-2">
							<div className="relative w-full h-[300px] lg:h-[400px]">
								<Image
								src="/work-2.png"
								alt="Recent work image"
								fill
								className="object-cover rounded-lg shadow-lg"
								priority
								/>
							</div>

							<h3 className="text-3xl md:text-4xl font-bold text-black mt-6">
								Work name here
							</h3>

							<p className="my-2 text-gray-500 text-lg leading-relaxed mb-8">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore.
							</p>

							<Link href="#" className="group inline-flex items-center justify-center text-base font-semibold text-center bg-lime-600 hover:bg-lime-800 border border-lime-500 text-white px-6 py-3 rounded-lg transition-colors duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
								Know more
								<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
								</svg>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
};

export default RecentWork;