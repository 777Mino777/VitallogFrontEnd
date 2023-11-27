import { useState } from "react";
import VlogNav from "./VlogNav"
import { useNavigate } from "react-router-dom";

const CommunityWritePage = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const createDate = new Date().toISOString().split('T')[0];
        const writer = "현재 로그인한 사용자 ID";
        console.log('제목:', title);
        console.log('내용:', content);
        
        const post = {
            title : title,
            contents : content,
            writer : writer,
            createDate : createDate,
        };
        
        fetch('', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
        },
        body : JSON.stringify(post)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        navigate('/community/board')
    })
    .catch((error) => {
        console.error('Error', error);
    });
};
    return (
    <div className="max-w-[1820px] mx-auto">
        <div className="flex flex-col min-h-screen bg-white text-gray-800">
            
            <header className="p-4 sm:p-6">
                <VlogNav isUserPage={true}/>
            </header>
            
            <main className="shadow-lg shadow-sky-400 rounded-2xl mx-36 mt-20 bg-custom-gradient border-4 border-sky-150 justify-center items-center text-center">
               <div>
                </div>
               <form onSubmit={handleSubmit} className="font-omyu_pretty mt-12 mb-12 mx-28 flex-col justify-start">
                <div className="flex justify-end">
                <div className="">
                    <label htmlFor="writer" className="">작성자</label>
                </div>
                <br/>
                <div>
                    날짜
                </div>
                </div>
                <div className="">
                <label htmlFor="title" className="rounded-xl bg-white mb-4 w-12 block border-4 border-sky-200 text-black text-lg font-extrabold">제목</label>
                <input 
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="placeholder-center font-extrabold rounded-lg border-4 w-full block border-sky-200 shadow-sm"
                    placeholder="제목을 입력하세요"
                    required
                />
                </div>
                <div className="">
                    <label htmlFor="content" className="shadow-inner rounded-xl bg-white border-4 border-sky-200 mt-4 mb-4 w-12 block text-lg font-extrabold text-black">내용</label>
                    <textarea 
                        id="content"
                        name="content"
                        rows={15}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="placeholder-center font-extrabold rounded-lg border-4 mr-24 block w-full border-sky-200 shadow-sm"
                        placeholder="내용을 입력하세요"
                        required
                    />
                </div>
                <div className="flex justify-end">
                    <button
                    type="submit"
                    className="placeholder w-36 mt-12 flex justify-center py-2 px-4 border-8 border-sky-700 text-2xl font-extrabold rounded-md text-white bg-custom-blue transition duration-300 hover:text-custom-blue hover:bg-white"
                    >
                        글쓰기
                    </button>
                        </div>
               </form>
               <div>
               </div>
            </main>
        </div>
        </div>
  )
}

export default CommunityWritePage
