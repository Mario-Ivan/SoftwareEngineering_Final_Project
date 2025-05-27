import { Link } from 'react-router-dom';

interface PostProps {
    id: number;
    name: string;
    avatar: string;
    time: string;
    content: string;
    image?: string;
    commentCount: number;
}

const PostCard = ({ id, name, avatar, time, content, image, commentCount }: PostProps) => {
    return (
        <Link
        to={`/community/${id}`}
        className="block"
        >
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 hover:bg-gray-50 transition cursor-pointer w-full">
            <div className="flex items-center mb-4">
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full mr-3" />
            <div>
                <p className="font-semibold">{name}</p>
                <p className="text-sm text-gray-500">{time}</p>
            </div>
            </div>
            <p className="mb-4 text-gray-800">{content}</p>
            {image && <img src={image} alt="Post visual" className="rounded-lg w-full mb-4" />}
            <p className="text-sm text-blue-600">💬 {commentCount} Komentar</p>
        </div>
        </Link>
    );
};

export default PostCard;
