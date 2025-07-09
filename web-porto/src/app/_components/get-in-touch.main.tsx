'use client';

const GetInTouch = () => {
	return (
		<section id="get-in-touch" className="bg-black bg-cover bg-center bg-no-repeat min-h-screen">
			<div className="grid max-w-5xl px-4 py-8 mx-auto my-12 items-center">
				<div className="text-center max-w-3xl mx-auto">

					<h2 className="mb-4 text-4xl font-bold md:text-5xl xl:text-5xl text-white items-center text-center relative">
						Get In Touch
					</h2>

					<p className="my-4 mb-6 text-gray-400 lg:mb-8 md:text-base lg:text-lg items-center text-center leading-relaxed">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</p>

					<div className="text-left max-w-md mx-auto">
						<div className="mb-4">
							<label className="block text-white text-sm font-semibold mb-2 text-left" htmlFor="email">
								Email
							</label>
							<input className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter your email" />
						</div>

						<div className="mb-4">
							<label className="block text-white text-sm font-semibold mb-2 text-left" htmlFor="mobile">
								Mobile
							</label>
							<input className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline" id="mobile" type="tel" placeholder="Enter mobile" />
						</div>

						<div className="mb-6">
							<label className="block text-white text-sm font-semibold mb-2 text-left" htmlFor="message">
								Message
							</label>
							<textarea className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 bg-white leading-tight focus:outline-none focus:shadow-outline h-32 resize-none" id="message" placeholder="Enter your message"></textarea>
						</div>

						<button type="button" className="w-full text-white font-semibold text-base bg-lime-600 hover:bg-lime-700 focus:ring-4 focus:ring-lime-300 rounded-lg px-5 py-3 focus:outline-none flex items-center justify-center group">
								Submit
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
								</svg>
						</button>

					</div>

				</div>
			</div>
		</section>
	)
};

export default GetInTouch;