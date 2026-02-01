import React from 'react';
import { Clock, Rocket, Sparkles } from 'lucide-react';

export default function ComingSoonPage({
    featureName = "Exciting New Feature",
    description = "We're working hard to bring you something amazing. Stay tuned!"
}) {
    return (
        <div className="min-h-screen border border-orange-50 rounded-lg bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full text-center">
                {/* Animated Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-orange-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-full shadow-2xl">
                            <Rocket className="w-16 h-16 text-white animate-bounce" />
                        </div>
                    </div>
                </div>

                {/* Sparkles decoration */}
                <div className="flex justify-center gap-4 mb-6">
                    <Sparkles className="w-6 h-6 text-orange-400 animate-pulse" />
                    <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <Sparkles className="w-6 h-6 text-orange-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>

                {/* Main Content */}
                <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
                    Coming Soon
                </h1>

                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-6">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">Under Development</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
                    {featureName}
                </h2>

                <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
                    {description}
                </p>
            </div>
        </div>
    );
}
