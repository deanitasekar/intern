'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ 
				behavior: 'smooth',
				block: 'start'
			});
		}
		setIsMenuOpen(false);
	};

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-black/80 backdrop-blur-sm">
			<div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">

					<div className="hidden md:flex items-center space-x-8 lg:space-x-12 ml-26">
						<button onClick={() => scrollToSection('hero')} className="text-gray-400 hover:text-white px-2 py-2 text-sm font-medium transition-colors duration-200">
							Home
						</button>

						<button onClick={() => scrollToSection('case-studies')} className="text-gray-400 hover:text-white px-2 py-2 text-sm font-medium transition-colors duration-200">
							Case Studies
						</button>

						<button onClick={() => scrollToSection('testimonials')} className="text-gray-400 hover:text-white px-2 py-2 text-sm font-medium transition-colors duration-200">
							Testimonials
						</button>

						<button onClick={() => scrollToSection('recent-work')} className="text-gray-400 hover:text-white px-2 py-2 text-sm font-medium transition-colors duration-200">
							Recent Work
						</button>

						<button onClick={() => scrollToSection('get-in-touch')} className="text-gray-400 hover:text-white px-2 py-2 text-sm font-medium transition-colors duration-200">
							Get In Touch
						</button>
					</div>

					<div className="hidden md:flex items-center space-x-4">
						<a href="#" className="text-gray-400 hover:text-white transition-colors duration-200" aria-label="Social Media">
							<Image 
								src="/social-media.png" 
								alt="Social Media" 
								width={120} 
								height={30}
								className="h-6 w-auto filter brightness-75 hover:brightness-100 transition-all duration-200"
							/>
						</a>
					</div>

					<div className="md:hidden ml-auto">
						<button onClick={toggleMenu} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600" aria-controls="navbar-default" aria-expanded={isMenuOpen}>
							<span className="sr-only">Open</span>
							<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
								<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
							</svg>
						</button>
					</div>
				</div>

				<div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
					<div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-sm border-t border-gray-700">
						<button onClick={() => scrollToSection('hero')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md text-sm font-medium transition-colors duration-200">
							Home
						</button>

						<button onClick={() => scrollToSection('case-studies')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md text-sm font-medium transition-colors duration-200">
							Case Studies
						</button>

						<button onClick={() => scrollToSection('testimonials')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md text-sm font-medium transition-colors duration-200">
							Testimonials
						</button>

						<button onClick={() => scrollToSection('recent-work')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md text-sm font-medium transition-colors duration-200">
							Recent Work
						</button>

						<button onClick={() => scrollToSection('get-in-touch')} className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md text-sm font-medium transition-colors duration-200">
							Get In Touch
						</button>

						<div className="pt-2 border-t border-gray-700">
							<a href="#" className="flex items-center px-3 py-2 text-gray-400 hover:text-white transition-colors duration-200" aria-label="Social Media">
								<Image 
									src="/social-media.png" 
									alt="Social Media" 
									width={120} 
									height={30}
									className="h-6 w-auto filter brightness-75 hover:brightness-100 transition-all duration-200"
								/>
							</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;