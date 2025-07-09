'use client';

import Image from 'next/image';

const Testimonials = () => {
	return (
		<section id="testimonials" className="bg-black bg-cover bg-center bg-no-repeat min-h-screen">
			<div className="max-w-5xl px-4 py-8 mx-auto my-12">
				<div className="text-center max-w-3xl mx-auto">
					<h2 className="mb-4 text-4xl font-bold md:text-5xl xl:text-5xl text-white items-center text-center relative">
						Testimonials
					</h2>

					<p className="my-4 mb-6 text-gray-400 lg:mb-8 md:text-base lg:text-lg items-center text-center leading-relaxed">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
					</p>
				</div>

				<div className="grid lg:grid-cols-2 gap-10 items-stretch">
					<div className="order-1 lg:order-1 relative">
						<div className="border border-gray-700 rounded-lg p-8 bg-black relative h-full min-h-[280px] flex flex-col justify-between">
							<div className="absolute -top-4 left-6 text-6xl text-white font-serif z-10">
								&ldquo;
							</div>
							
							<p className="text-gray-400 text-lg leading-relaxed mb-8 mt-6 flex-grow">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>

							<div className="flex items-center gap-4">
								<div className="w-16 h-16 relative">
									<Image
										src="/avatar-1.png"
										alt="Avatar"
										fill
										sizes="64px"
										className="rounded-full object-cover"
									/>
								</div>
								<span className="text-white text-xl font-semibold">
									Client Name
								</span>
							</div>
						</div>
					</div>

					<div className="order-2 lg:order-2 relative">
						<div className="border border-gray-700 rounded-lg p-8 bg-black relative h-full min-h-[280px] flex flex-col justify-between">
							<div className="absolute -top-4 left-6 text-6xl text-white font-serif z-10">
								&ldquo;
							</div>
							
							<p className="text-gray-400 text-lg leading-relaxed mb-8 mt-6 flex-grow">
								Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
							</p>

							<div className="flex items-center gap-4">
								<div className="w-16 h-16 relative">
									<Image
										src="/avatar-2.png"
										alt="Avatar"
										fill
										sizes="64px"
										className="rounded-full object-cover"
									/>
								</div>
								<span className="text-white text-xl font-semibold">
									Client Name
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className="grid lg:grid-cols-2 gap-10 items-stretch mt-16">
					<div className="order-1 lg:order-1 relative">
						<div className="border border-gray-700 rounded-lg p-8 bg-black relative h-full min-h-[280px] flex flex-col justify-between">
							<div className="absolute -top-4 left-6 text-6xl text-white font-serif z-10">
								&ldquo;
							</div>
							
							<p className="text-gray-400 text-lg leading-relaxed mb-8 mt-6 flex-grow">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</p>

							<div className="flex items-center gap-4">
								<div className="w-16 h-16 relative">
									<Image
										src="/avatar-3.png"
										alt="Avatar"
										fill
										sizes="64px"
										className="rounded-full object-cover"
									/>
								</div>
								<span className="text-white text-xl font-semibold">
									Client Name
								</span>
							</div>
						</div>
					</div>

					<div className="order-2 lg:order-2 relative">
						<div className="border border-gray-700 rounded-lg p-8 bg-black relative h-full min-h-[280px] flex flex-col justify-between">
							<div className="absolute -top-4 left-6 text-6xl text-white font-serif z-10">
								&ldquo;
							</div>
							
							<p className="text-gray-400 text-lg leading-relaxed mb-8 mt-6 flex-grow">
								Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
							</p>

							<div className="flex items-center gap-4">
								<div className="w-16 h-16 relative">
									<Image
										src="/avatar-4.png"
										alt="Avatar"
										fill
										sizes="64px"
										className="rounded-full object-cover"
									/>
								</div>
								<span className="text-white text-xl font-semibold">
									Client Name
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
};

export default Testimonials;
