import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
        images: ['https://picsum.photos/seed/picsum/200/300'],
        commentCount: 3
    },
    {
        id: 3,
        name: 'Arief Pratama',
        avatar: 'https://i.pravatar.cc/100?u=arief',
        time: '2 jam yang lalu',
        content: 'Saya sedang mengembangkan aplikasi mobile dengan React Native. Ada saran untuk backend terbaik?',
        commentCount: 7
    }
];

const initialComments = [
    { name: 'Budi', content: 'Sangat bermanfaat, terima kasih!' },
    { name: 'Ani', content: 'Saya juga ingin tahu lebih lanjut soal ini.' }
];

const PostDetailPage = () => {
    const navigate = useNavigate();
    const { postId } = useParams();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [comments, setComments] = useState(initialComments);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const post = posts.find((p) => p.id === Number(postId));

    if (!post) {
        return <div className="text-center py-20 text-gray-600">Post tidak ditemukan.</div>;
    }

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !content.trim()) return;

        setComments((prev) => [...prev, { name, content }]);
        setName('');
        setContent('');
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-blue-600 hover:underline flex items-center gap-1"
                >
                ← Kembali
                </button>
            <h2 className="text-2xl font-bold mb-4">{post.name}</h2>

            <h2 className="text-2xl font-bold mb-4">{post.name}</h2>
            <div className="flex items-center mb-4">
                <img src={post.avatar} alt={post.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                <p className="font-medium">{post.name}</p>
                <p className="text-sm text-gray-500">{post.time}</p>
                </div>
            </div>

            <p className="text-gray-800 mb-4">{post.content}</p>

            {post.images && post.images.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {post.images.map((src, idx) => (
                    <img
                    key={idx}
                    src={src}
                    alt={`post-img-${idx}`}
                    className="rounded cursor-pointer object-cover max-h-60 w-full"
                    onClick={() => setSelectedImage(src)}
                    />
                ))}
                </div>
            )}

            <div className="bg-white p-6 rounded shadow mb-6">
                <h3 className="font-semibold mb-4">Komentar</h3>
                <ul className="space-y-4 mb-6">
                {comments.map((comment, i) => (
                    <li key={i} className="border-b pb-2">
                    <p className="font-medium">{comment.name}</p>
                    <p className="text-gray-600 text-sm">{comment.content}</p>
                    </li>
                ))}
                </ul>

                <form onSubmit={handleAddComment} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nama</label>
                    <input
                    type="text"
                    className="mt-1 w-full border rounded px-3 py-2 text-sm bg-gray-100 cursor-not-allowed"
                    value={/* Replace with session user name, e.g., */ "NamaUser"}
                    readOnly
                    disabled
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Komentar</label>
                    <textarea
                    className="mt-1 w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tulis komentar..."
                    rows={3}
                    required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    Kirim Komentar
                </button>
                </form>
            </div>

            {/* Image Preview Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                <div className="relative">
                    <img
                    src={selectedImage}
                    alt="Preview"
                    className="max-h-[90vh] max-w-[90vw] rounded shadow-lg"
                    />
                    <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-2 right-2 text-white text-xl bg-black bg-opacity-50 p-1 rounded-full hover:bg-opacity-80"
                    >
                    ✖
                    </button>
                </div>
                </div>
            )}
        </div>
    );
};

export default PostDetailPage;
