// src/components/Button.jsx
interface ButtonProps {
    text: string;
    onClick: () => void;
    type?: "button" | "submit" | "reset";
}

export default function Button({ text, onClick, type = "button" }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md w-full flex items-center justify-center gap-2"
        >
        {text} →
        </button>
    );
}
