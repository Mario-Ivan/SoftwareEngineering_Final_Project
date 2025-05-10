import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import AlertPopup from "../../components/AlertPopup";

type Video = {
    id: number;
    uploadTime: string;
    title: string;
    category: string;
    description: string;
};
const dummyData: Video[] = []; // Initialize with an empty array

    

export default function VideoList() {
    const [videos, setVideos] = useState<Video[]>(dummyData);

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [alert, setAlert] = useState<{ show: boolean; type?: 'success' | 'error'; message: string }>({ show: false, type: 'success', message: '' });
    const [isHovered, setIsHovered] = useState(false); 
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (alert.show && !isHovered) {
        timer = setTimeout(() => {
            setAlert({ ...alert, show: false });
        }, 3000);
        }

        return () => {
        clearTimeout(timer);
        };
    }, [alert, alert.show, isHovered]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const host: string = import.meta.env.VITE_SERVER_URL;
                const response = await axios.post(`${host}/videos/paginate`, {
                    page,
                    limit,
                });
                console.log(response.data.videos);
                setVideos(response.data.videos);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };

        fetchVideos();
    }, [page, limit]);
    
    return (
        <div className="p-6 bg-white rounded-xl shadow-md">
        <div className="flex justify-between mb-5">
            <h2 className="text-xl font-semibold">Daftar Video</h2>
            <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 mr-1 mt-5">
            Tambah Video
            </button>
        </div>

        <div className="flex justify-end mb-2">
            <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 px-3 py-1 rounded"
            />
        </div>

        <table className="w-full text-sm border border-gray-300-collapse">
            <thead>
            <tr className="bg-gray-100 text-left">
                <th className="p-2 border border-gray-300">NO</th>
                <th className="p-2 border border-gray-300">TANGGAL UNGGAH</th>
                <th className="p-2 border border-gray-300">JUDUL VIDEO</th>
                <th className="p-2 border border-gray-300">KATEGORI</th>
                <th className="p-2 border border-gray-300">DESKRIPSI</th>
                <th className="p-2 border border-gray-300">AKSI</th>
            </tr>
            </thead>
            <tbody>
            {videos.map((video, index) => (
                <tr key={video.id} className="text-gray-700">
                <td className="p-2 border border-gray-300 text-center">{index + 1}</td>
                <td className="p-2 border border-gray-300">
                    {new Date(video.uploadTime).toLocaleString()}
                </td>
                <td className="p-2 border border-gray-300">{video.title}</td>
                <td className="p-2 border border-gray-300">{video.category}</td>
                <td className="p-2 border border-gray-300">{video.description}</td>
                <td className="p-2 border border-gray-300 text-center space-x-2">
                    <button className="bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600">
                    ✏️
                    </button>
                    <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        onClick={async () => {
                            try {
                                const host: string = import.meta.env.VITE_SERVER_URL;
                                await axios.delete(`${host}/deleteVideo/${video.id}`);
                                setVideos((prevVideos) =>
                                    prevVideos.filter((v) => v.id !== video.id)
                                );
                                setAlert({ show: true, type: 'success', message: 'Video deleted successfully' });
                            } catch (error) {
                                console.error("Error deleting video:", error);
                                setAlert({ show: true, type: 'error', message: 'Failed to delete video' });
                            }
                        }}
                    >
                    🗑️
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>

        <div className="flex justify-between mt-4 text-sm text-gray-600">
            <span>Showing 1 to 3 of 3 entries</span>
            <div className="space-x-1">
            <button className="px-3 py-1 border border-gray-300 rounded text-gray-600">Previous</button>
            <button className="px-3 py-1 bg-indigo-500 text-white rounded">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-gray-600">Next</button>
            </div>
        </div>
        {alert.show && (
                <AlertPopup
                type={alert.type || 'success'}
                message={alert.message}
                onClose={() => setAlert({ ...alert, show: false })}
                duration={3000}
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
                />
            )}
        </div>
    );
}
