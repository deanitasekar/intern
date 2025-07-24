"use client";

import { useAuth } from "@/hooks/use-auth.hook";

export default function ProfileMain() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Profile</h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 px-8 py-12 text-center">
              <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-4 border-white/30">
                <span className="text-4xl font-bold text-white">
                  {user?.name?.charAt(0)?.toUpperCase() ||
                    user?.username?.charAt(0)?.toUpperCase()}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-white mb-2">
                {user?.name}
              </h2>
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                <span className="text-white font-medium">
                  {user?.role}
                </span>
              </div>
            </div>

            <div className="px-8 py-8">
              <div className="grid gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Email Address
                  </label>
                  <div className="flex items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200 hover:border-blue-300 transition-colors">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-gray-700 font-medium">
                      {user?.email}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Username
                  </label>
                  <div className="flex items-center bg-gray-50 rounded-xl px-4 py-4 border border-gray-200 hover:border-blue-300 transition-colors">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="text-gray-700 font-medium">
                      {user?.username}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
