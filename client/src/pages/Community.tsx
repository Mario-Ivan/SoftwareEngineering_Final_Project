import { useState } from 'react';
import PostCard from '../components/PostCard';
import MiniNavbar from '../components/miniNavbart';
import Navbar from '../components/Navbar';

const posts = [
    {
        id: 1,
        name: 'Marlina',
        avatar: 'https://i.pravatar.cc/100?u=marlina',
        time: '1 jam yang lalu',
        content: 'Bagaimana strategi terbaik untuk menarik investor di tahun 2025?',
        commentCount: 9
    },
    {
        id: 2,
        name: 'Kyle Fisher',
        avatar: 'https://i.pravatar.cc/100?u=kyle',
        time: '1 jam yang lalu',
        content: 'Berapa modal ideal untuk memulai startup di bidang teknologi?',
        images: [
        'https://source.unsplash.com/featured/800x400/?startup,technology'
        ],
        commentCount: 3
    },
    {
        id: 3,
        name: 'Arief Pratama',
        avatar: 'https://i.pravatar.cc/100?u=arief',
        time: '2 jam yang lalu',
        content: 'Saya sedang mengembangkan aplikasi mobile dengan React Native. Ada saran untuk backend terbaik?',
        commentCount: 7
    },
    {
        id: 4,
        name: 'Dewi Ayu',
        avatar: 'https://i.pravatar.cc/100?u=dewi',
        time: '3 jam yang lalu',
        content: 'Tips manajemen waktu untuk mahasiswa yang juga sedang magang?',
        images: [
        'https://source.unsplash.com/featured/800x400/?time-management,student'
        ],
        commentCount: 4
    },
    {
        id: 5,
        name: 'Samantha Lee',
        avatar: 'https://i.pravatar.cc/100?u=samantha',
        time: '1 hari yang lalu',
        content: 'Check out my new UI/UX design for a fintech app!',
        images: [
        'https://source.unsplash.com/featured/800x400/?fintech,app-design',
        'https://source.unsplash.com/featured/800x400/?ui-ux,design'
        ],
        commentCount: 6
    },
    {
        id: 6,
        name: 'Budi Santoso',
        avatar: 'https://i.pravatar.cc/100?u=budi',
        time: '1 hari yang lalu',
        content: 'Bagaimana pendapat kalian soal AI dan masa depan pekerjaan?',
        images: [
        'https://source.unsplash.com/featured/800x400/?artificial-intelligence,future'
        ],
        commentCount: 12
    }
];



const CommunityPage = () => {
    const [postText, setPostText] = useState('');
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImageFiles(files);
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    const handlePostSubmit = () => {
        if (postText.trim() === '') return;

        // This is where you'd handle posting the data (e.g., FormData for server)
        console.log('Posting:', {
        postText,
        images: imageFiles
        });

        // Reset form
        setPostText('');
        setImageFiles([]);
        setPreviewImages([]);
    };

    return (
        <>
            <MiniNavbar></MiniNavbar>
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
                        <label className="cursor-pointer">
                        📷
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
                            <img
                            key={idx}
                            src={src}
                            alt={`preview-${idx}`}
                            className="rounded max-h-40 object-cover"
                            />
                        ))}
                        </div>
                    )}
                    </div>

                    {/* Posts */}
                    {posts.map((post) => (
                    <PostCard key={post.id} {...post} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default CommunityPage;
