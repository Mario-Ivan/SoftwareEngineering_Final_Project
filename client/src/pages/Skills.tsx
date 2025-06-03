import React, { useState } from 'react';
import MiniNavbar from '../components/miniNavbart';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const videos = Array.from({ length: 8 }, (_, index) => ({
    id: index,
    title: 'Strategi Meningkatkan Omzet Bisnis dengan Digital Marketing',
    duration: '45 MENIT',
    timeAgo: '1 Minggu lalu',
    thumbnail: 'src/assets/videoTemplate.png', 
}));

export default function VideoLibrary() {
    const [search, setSearch] = useState('');

    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <MiniNavbar />
            <Navbar message="Belum punya Akun?" buttonMessage="Daftar Sekarang" route={"/signup"} />
            <div className="min-h-screen bg-white">
            <div className="bg-[#2E2F5B] py-6 px-8">
                <h1 className="text-white text-3xl font-bold text-center">Video</h1>
            </div>

            <div className="max-w-6xl mx-auto p-6">
                <div className="mb-6 relative">
                <input
                    type="text"
                    placeholder="Cari"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md pl-10"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <span className="absolute left-3 top-2.5 text-gray-400">
                    🔍
                </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredVideos.map(video => (
                    <div key={video.id} className="space-y-2">
                    <div className="relative">
                        <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="rounded-lg w-full h-48 object-cover"
                        />
                        <button className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black bg-opacity-50 rounded-full p-2">
                            ▶️
                        </div>
                        </button>
                    </div>
                    <div className="text-sm text-gray-500 flex gap-3">
                        <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-md text-xs font-medium">
                        {video.duration}
                        </span>
                        <span>{video.timeAgo}</span>
                    </div>
                    <h2 className="text-sm font-semibold text-gray-800">
                        {video.title}
                    </h2>
                    </div>
                ))}
                </div>
            </div>
            </div>
            <Footer />
        </>
    );
}
