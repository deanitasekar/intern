"use client";

import Image from "next/image";

export function PagesContent() {
  return (
    <section className="py-16 bg-white">
      <div className="container-md mx-auto px-6">
        <div className="flex items-center mb-8">
          <span className="text-gray-400 mr-6 text-lg">Share</span>
          <div className="flex items-center space-x-4">
            <button className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </button>
            <button className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </button>
            <button className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mb-16">
          <div
            className="bg-gray-100 overflow-hidden"
            style={{ height: "500px" }}
          >
            <Image
              src="/pages-1.png"
              alt="Green velvet sofa"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-4 text-gray-600 leading-relaxed mb-16">
          <p>It&apos;s a tricky thing, being a wedding guest.</p>
          <p>
            Among the endless list of requirements &apos; buy a present, arrange
            accommodation, practise your small talk &apos; there&apos;s one
            obligation that trumps them all in terms of effort: fix up and look
            sharp.
          </p>
          <p>
            The rules surrounding wedding guest dressing are as nuanced as they
            come.
          </p>
          <p>
            There are some obvious musts &apos; avoiding white is always a good
            idea &apos; and others that are only acknowledged by serial
            wedding-goers, such as steering clear of stilettos unless you enjoy
            the feeling of numbness in your feet.
          </p>
          <p>
            In the summer, things get even more complicated. Not only do you
            have to find a sweat-free way to &quot;dress to the nines&quot;, but
            you have to strike the right balance between playful sunshine garb
            and formal occasionwear. This forces you to ask difficult questions,
            such as `&quot;Is this wrap dress more &apos;I do&apos; or
            &apos;BBQ?&apos;&quot; and &quot;Does this hat make me look like a
            chic French woman, or a dishevelled bird?&quot;
          </p>
          <p>
            It&apos;s no mean feat, so here&apos;s our handy guide to summer
            wedding guest dressing, with tips from industry experts on the
            trends and colours you need to know about this season.
          </p>
        </div>

        <div>
          <div
            className="bg-gray-100 overflow-hidden"
            style={{ height: "500px" }}
          >
            <Image
              src="/pages-2.png"
              alt="White sofa"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
