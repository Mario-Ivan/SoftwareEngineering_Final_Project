import { Link } from 'react-router-dom';

interface PostProps {
  id: number;
  name: string;
  avatar: string;
  time: string;
  content: string;
  images?: string[];
  commentCount: number;
  onImageClick?: (src: string) => void;
}

const PostCard = ({
    id,
    name,
    avatar,
    time,
    content,
    images,
    commentCount,
    onImageClick,
    }: PostProps) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 hover:bg-gray-50 transition w-full">
        <Link to={`/community/${id}`} className="block">
            <div className="flex items-center mb-4">
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full mr-3" />
            <div>
                <p className="font-semibold">{name}</p>
                <p className="text-sm text-gray-500">{time}</p>
            </div>
            </div>
            <p className="mb-4 text-gray-800">{content}</p>
        </Link>

        {/* Render multiple clickable images */}
        {images && images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {images.map((src, index) => (
                <img
                key={index}
                src={src}
                alt={`post-${id}-img-${index}`}
                className="rounded-lg object-cover cursor-pointer max-h-60 w-full"
                onClick={() => onImageClick?.(src)}
                />
            ))}
            </div>
        )}

        <p className="text-sm text-blue-600">💬 {commentCount} Komentar</p>
        </div>
    );
};

export default PostCard;
