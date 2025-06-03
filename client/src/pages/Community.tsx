import { useState } from 'react';
import PostCard from '../components/PostCard';
import MiniNavbar from '../components/miniNavbart';
import Navbar from '../components/Navbar';

// Updated posts data: 'time' is ISO datetime string
const posts = [
    {
        id: 1,
        name: 'Marlina',
        avatar: 'https://i.pravatar.cc/100?u=marlina',
        time: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
        content: 'Bagaimana strategi terbaik untuk menarik investor di tahun 2025?',
        commentCount: 9
    },
    {
        id: 2,
        name: 'Kyle Fisher',
        avatar: 'https://i.pravatar.cc/100?u=kyle',
        time: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
        content: 'Berapa modal ideal untuk memulai startup di bidang teknologi?',
        images: [
            'https://picsum.photos/seed/picsum/200/300?random=1'
        ],
        commentCount: 3
    },
    {
        id: 3,
        name: 'Arief Pratama',
        avatar: 'https://i.pravatar.cc/100?u=arief',
        time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),  // 2 hours ago
        content: 'Saya sedang mengembangkan aplikasi mobile dengan React Native. Ada saran untuk backend terbaik?',
        commentCount: 7
    },
    {
        id: 4,
        name: 'Dewi Ayu',
        avatar: 'https://i.pravatar.cc/100?u=dewi',
        time: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),  // 3 hours ago
        content: 'Tips manajemen waktu untuk mahasiswa yang juga sedang magang?',
        images: [
            'https://picsum.photos/seed/picsum/200/300?random=2'
        ],
        commentCount: 4
    },
    {
        id: 5,
        name: 'Samantha Lee',
        avatar: 'https://i.pravatar.cc/100?u=samantha',
        time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),  // 1 day ago
        content: 'Check out my new UI/UX design for a fintech app!',
        images: [
            'https://picsum.photos/seed/picsum/200/300?random=3',
            'https://picsum.photos/seed/picsum/200/300?random=4'
        ],
        commentCount: 6
    },
    {
        id: 6,
        name: 'Budi Santoso',
        avatar: 'https://i.pravatar.cc/100?u=budi',
        time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        content: 'Bagaimana pendapat kalian soal AI dan masa depan pekerjaan?',
        images: [
            'https://picsum.photos/seed/picsum/200/300?random=5'
        ],
        commentCount: 12
    }
];

// Optional: helper to format date for display (e.g., "1 jam yang lalu" style)
const formatTime = (isoString: string) => {
    const now = new Date();
    const time = new Date(isoString);
    const diffMs = now.getTime() - time.getTime();

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    if (diffMinutes < 60) return `${diffMinutes} menit yang lalu`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} jam yang lalu`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} hari yang lalu`;
};

const CommunityPage = () => {
    const [postText, setPostText] = useState('');
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImageFiles(prev => [...prev, ...files]);
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(prev => [...prev, ...previews]);
    };

    const handleDeleteImage = (index: number) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
    };

    const handlePostSubmit = () => {
        if (postText.trim() === '') return;

        console.log('Posting:', {
            postText,
            images: imageFiles
        });

        setPostText('');
        setImageFiles([]);
        setPreviewImages([]);
    };
    const toggleSortOrder = () => {
        setSortOrder(prev => (prev === 'desc' ? 'asc' : 'desc'));
    };

    // Sort posts accordingly
    const sortedPosts = [...posts].sort((a, b) => {
        if (sortOrder === 'desc') {
            return new Date(b.time).getTime() - new Date(a.time).getTime();
        } else {
            return new Date(a.time).getTime() - new Date(b.time).getTime();
        }
    });

    return (
        <>
            <MiniNavbar />
            <Navbar message="Belum punya Akun?" buttonMessage="Daftar Sekarang" route={"/signup"} />
            <div className="bg-[#F9FAFB] min-h-screen">
                <div className="bg-[#1B1545] text-white text-center py-16">
                    <h1 className="text-3xl font-bold">Community</h1>
                </div>

                <div className="max-w-4xl mx-auto px-4 py-12">
                    {/* Create Post */}
                    <div className="bg-white p-6 rounded-lg shadow mb-10">
                        <h2 className="text-lg font-semibold mb-4">POSTINGAN BARU</h2>
                        <textarea
                            placeholder="Apa yang sedang kamu pikirkan?"
                            className="w-full border-b p-2 outline-none mb-4 resize-none"
                            rows={3}
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}
                        />
                        <div className="flex items-center justify-between">
                            <label className="cursor-pointer border border-gray-300 rounded px-3 py-1 flex items-center gap-2 hover:border-blue-500 transition">
                                📷 Upload Photo
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                            <button
                                onClick={handlePostSubmit}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Kirim
                            </button>
                        </div>

                        {/* Image previews */}
                        {previewImages.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {previewImages.map((src, idx) => (
                                    <div key={idx} className="relative group">
                                        <img
                                            src={src}
                                            alt={`preview-${idx}`}
                                            className="rounded max-h-40 object-cover w-full"
                                        />
                                        <button
                                            onClick={() => handleDeleteImage(idx)}
                                            className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full p-2 text-xs opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                                            title="Hapus Gambar"
                                            style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            ❌
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                    <div className="mb-6 flex justify-end">
                        <button
                            onClick={toggleSortOrder}
                            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                        >
                            Urutkan: {sortOrder === 'desc' ? 'Terbaru' : 'Terlama'}
                        </button>
                    </div>

                    {/* Posts sorted by datetime descending */}
                    {sortedPosts.map((post) => (
                        <PostCard key={post.id} {...post} time={formatTime(post.time)} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default CommunityPage;
