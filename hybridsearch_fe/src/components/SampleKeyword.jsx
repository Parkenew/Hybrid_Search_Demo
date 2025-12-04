import { useNavigate } from "react-router-dom";

export default function SampleKeyword(){
    const navigate = useNavigate();

    const examples = ["스타트업", "시작하는 기업"];

    const handleExampleClick = (keyword) => {
    navigate(`/result?query=${encodeURIComponent(keyword)}`);
    };

    return (
        <div className="text-center font-bold">
            <span className=" opacity-70">예시 검색어 : </span>
            {examples.map((ex, idx) => (
                <button
                    key={idx}
                    onClick={() => handleExampleClick(ex)}
                    className="mx-1 text-blue-600 dark:text-blue-300 underline hover:opacity-80"
                >   
                    {ex}
                </button>
            ))}
        </div>
    );
}