import { useParams } from 'react-router-dom';

const dummyComments = [
  { name: 'Budi', content: 'Sangat bermanfaat, terima kasih!' },
  { name: 'Ani', content: 'Saya juga ingin tahu lebih lanjut soal ini.' }
];

const PostDetailPage = () => {
    const { postId } = useParams();

    // You can fetch the actual post here using `id`
    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-4">Detail Post #{postId}</h2>
        <p className="mb-6 text-gray-700">
            Ini adalah halaman detail dari post dengan ID {postId}. Di sini akan tampil isi lengkap post serta semua komentar.
        </p>

        <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold mb-4">Komentar</h3>
            <ul className="space-y-4">
            {dummyComments.map((comment, i) => (
                <li key={i} className="border-b pb-2">
                <p className="font-medium">{comment.name}</p>
                <p className="text-gray-600 text-sm">{comment.content}</p>
                </li>
            ))}
            </ul>
        </div>
        </div>
    );
};

export default PostDetailPage;
