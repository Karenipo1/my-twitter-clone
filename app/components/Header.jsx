'use client';
export default function Header() {
    return(
        <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-gray-800">
            <div className="flex justify-around text-gray-400 font-semibold">
                <button className="flex-1 py-4 hover:bg-gray-900 hover:text-white text-center transition-colors">
                For you
                </button>
                <button className="flex-1 py-4 hover:bg-gray-900 hover:text-white text-center transition-colors">
                Following
                </button>
            </div>
        </div>
    );
}