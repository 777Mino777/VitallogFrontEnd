import { useState } from "react";
import VlogNav from "./VlogNav"
import { useNavigate } from "react-router-dom";

const CommunityWritePage = () => {
    
    const MAX_TITLE_LENGTH = 50;
    const MAX_CONTENTS_LENGTH = 2000;

    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [titleError, setTitleError] = useState('');
    const [contentsError, setContentsError] = useState('');
    const createDate = new Date().toISOString().split('T')[0];
    const [category, setCategory] = useState('daily');

    const navigate = useNavigate();
    const writer = localStorage.getItem("id");

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        if (e.target.value.length > MAX_TITLE_LENGTH) {
            setTitleError(`제목은 ${MAX_TITLE_LENGTH}자까지만 입력 가능합니다.`)
        } else {
            setTitleError('');
            setTitle(newTitle);
        }
        
    };

    const handleContentsChange = (e) => {
        const newContents = e.target.value;
        if (e.target.value.length > MAX_CONTENTS_LENGTH) {
            setContentsError(`내용은 ${MAX_CONTENTS_LENGTH}자까지만 입력 가능합니다.`)
        } else {
            setContentsError('');
            setContents(newContents);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const Authorization = localStorage.getItem("token");

        const post = {
            title: title,
            createDate: createDate,
            contents: contents,
            writer: writer,
            category: category,
        };

        fetch('http://10.125.121.216:8080/api/vitallog/community/write', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": Authorization,
            },
            body: JSON.stringify(post)
            // body: formData
        })
            .then(response =>
                {
                    if(!response.ok) {
                        new Error('Network nononoyeah')
                    } return response.text();
                }
            )
            .then(data => {
                console.log(data);

                navigate('/community')
            })
            .catch((error) => {
                console.error('Error', error);
            });
    };
    return (
        <div className="max-w-[1820px] mx-auto">
            <div className="flex flex-col min-h-screen bg-white text-gray-800">

                <header className="bg-white p-6">
                    <VlogNav isUserPage={true} />
                </header>

                <main className="shadow-lg px-4 rounded-2xl mx-60 mt-20 bg-sky-100 border-2 border-gray-200 justify-center items-center text-center">
                    <form onSubmit={handleSubmit} className="mt-12 mb-4 mx-12 flex-col justify-start">
                        <div className="">

                            <div className="mx-2 text-lg flex justify-end font-extrabold text-black">
                                {createDate}
                            </div>
                            <div className="mt-2 flex justify-end text-base">
                                <label htmlFor="writer" className="border-2 font-extrabold border-sky-700 rounded-xl px-3 bg-white text-sky-700">작성자 : {writer}</label>
                            </div>

                        </div>
                        {titleError && <div className="text-red-500 text-sm">{titleError}</div>}
                        
                        <div className="flex">
                            
                            <div className="w-full">
                            <label htmlFor="title" className="mb-4 w-12 block border-b-2 border-sky-300 text-black text-lg font-extrabold">제목</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={handleTitleChange}
                                className="placeholder:text-gray-300 px-2 text-xl py-2 placeholder-center font-extrabold rounded-lg border-t-2 border-b-2 w-[100%] block bg-white border-sky-300 shadow-sm"
                                placeholder="제목을 입력하세요"
                                required
                            />
                            </div>
                            <div className="flex mt-10">
                            <label htmlFor="category" className="" ></label>
                            <select
                                id="category"
                                value={category}
                                onChange={handleContentsChange}
                                className="border-2 font-bold text-black border-sky-700 rounded-xl px-4 py-2 mt-2 ml-4"
                            >
                                <option value="daily">일상</option>
                                <option value="tip">꿀팁</option>
                                <option value="recruit">모집</option>
                                <option value="proud">자랑</option>
                                <option value="question">질문</option>
                            </select>
                            </div>
                        </div>
                        {contentsError && <div className="text-red-500 text-sm">{contentsError}</div>}
                        <div className="">
                            <label htmlFor="contents" className="border-b-2 border-sky-300 mt-4 mb-4 w-12 block text-lg font-extrabold text-black">내용</label>
                            <textarea
                                id="contents"
                                name="contents"
                                rows={15}
                                value={contents}
                                onChange={(e) => setContents(e.target.value)}
                                className="placeholder:text-gray-300 px-2 bg-white placeholder-center font-extrabold rounded-lg border-y-2 mr-24 block w-full border-sky-300 shadow-sm"
                                placeholder="내용을 입력하세요"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="placeholder w-36 mt-4 flex justify-center py-2 px-4 border-2 border-sky-700 text-xl font-extrabold rounded-md text-sky-700 bg-white transition duration-50 hover:text-white hover:bg-sky-700"
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
