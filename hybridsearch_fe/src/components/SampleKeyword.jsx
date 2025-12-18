import { useNavigate } from "react-router-dom";

export default function SampleKeyword(){
    const navigate = useNavigate();

    const examples = ["인공지능","서버 장애","애완동물","대기 오염을 줄이기 위한 시민들의 노력"];

    const handleExampleClick = (keyword) => {
    navigate(`/result?query=${encodeURIComponent(keyword)}`);
    };

    return (
        <div className="text-center font-bold">
            {/* <span className=" opacity-70">예시 검색어 : </span> */}
            {examples.map((ex, idx) => (
                <button
                    key={idx}
                    onClick={() => handleExampleClick(ex)}
                    className="mx-1 text-gray-500 dark:text-gray-200
                    border rounded-full dark:border-gray-600
                    pt-2 pb-2 pl-3 pr-3 
                    bg-[#f7f7f9] dark:bg-gray-900 
                    text-sm hover:opacity-80"
                    
                >   
                    {ex}
                </button>
            ))}
        </div>
    );
}