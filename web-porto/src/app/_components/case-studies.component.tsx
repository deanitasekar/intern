'use client';

import Image from 'next/image'
import React from "react"
import Link from 'next/link'

const CaseStudies = () => {
	return (
		<section id="case-studies" className="bg-white bg-cover bg-center bg-no-repeat min-h-screen">
			<div className="max-w-5xl px-4 py-8 mx-auto">
				<div className="text-center max-w-3xl mx-auto my-12">
					<h2 className="mb-4 text-4xl font-bold md:text-5xl xl:text-5xl text-black items-center text-center relative">
						Case Studies
					</h2>

					<p className="my-4 mb-6 text-gray-400 lg:mb-8 md:text-base lg:text-lg items-center text-center leading-relaxed">
						Solving user & business problems since last 15+ years. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
					</p>
				</div>   

				<div className="grid lg:grid-cols-2 gap-10 items-center">
					<div className="order-2 lg:order-1">
						<div className="mb-4">
							<span className="inline-block bg-orange-100 text-orange-500 text-sm font-medium px-3 py-1 rounded-full">
								Fintech
							</span>
						</div>
						
						<h3 className="text-3xl md:text-4xl font-bold text-black mb-6">
							Work name here
						</h3>
						
						<p className="text-gray-500 text-lg leading-relaxed mb-8">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna.
						</p>
						
						<Link href="#" className="group inline-flex items-center justify-center text-base font-medium text-center bg-gradient-to-r from-orange-400 to-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25">
							View case study
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
							</svg>
						</Link>
					</div>
					
					<div className="order-1 lg:order-2">
						<div className="relative w-full h-[300px] lg:h-[400px]">
							<Image 
								src="/study-1.png"
								alt="Fintech case study" 
								fill
								className="object-cover rounded-lg shadow-lg"
								priority
							/>
						</div>
					</div>
				</div>

				<div className="grid lg:grid-cols-2 gap-10 items-center mt-16">
					<div className="order-1 lg:order-1">
						<div className="relative w-full h-[300px] lg:h-[400px]">
							<Image 
								src="/study-2.png"
								alt="EdTech case study" 
								fill
								className="object-cover rounded-lg shadow-lg"
								priority
							/>
						</div>
					</div>

					<div className="order-2 lg:order-2">
						<div className="mb-4">
							<span className="inline-block bg-blue-100 text-blue-500 text-sm font-medium px-3 py-1 rounded-full">
								EdTech
							</span>
						</div>
						
						<h3 className="text-3xl md:text-4xl font-bold text-black mb-6">
							Work name here
						</h3>
						
						<p className="text-gray-500 text-lg leading-relaxed mb-8">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna.
						</p>
						
						<Link href="#" className="group inline-flex items-center justify-center text-base font-medium text-center bg-gradient-to-r from-blue-400 to-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
							View case study
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
							</svg>
						</Link>
					</div>
				</div>

				<div className="grid lg:grid-cols-2 gap-10 items-center mt-16 mb-16">
					<div className="order-2 lg:order-1">
						<div className="mb-4">
							<span className="inline-block bg-green-100 text-teal-500 text-sm font-medium px-3 py-1 rounded-full">
								Pharma
							</span>
						</div>
						
						<h3 className="text-3xl md:text-4xl font-bold text-black mb-6">
							Work name here
						</h3>
						
						<p className="text-gray-500 text-lg leading-relaxed mb-8">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna.
						</p>
						
						<Link href="#" className="group inline-flex items-center justify-center text-base font-medium text-center bg-gradient-to-r from-teal-400 to-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg transition-colors duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25">
							View case study
							<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
							</svg>
						</Link>
					</div>
					
					<div className="order-1 lg:order-2">
						<div className="relative w-full h-[300px] lg:h-[400px]">
							<Image 
								src="/study-1.png"
								alt="Pharma case study" 
								fill
								className="object-cover rounded-lg shadow-lg"
								priority
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CaseStudies;