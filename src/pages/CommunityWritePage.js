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

    const handleCancelButton = (e) => {
        e.preventDefault();
        navigate("/community")
    }

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
            .then(response => {
                if (!response.ok) {
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

                <main className="shadow-lg rounded-2xl mx-60 mt-20 bg-white border-2 border-gray-200 justify-center items-center text-center">
                    <div className="border-t-2 bg-custom-blue font-bold text-2xl text-white rounded-t-xl px-2 py-2 border-custom-blue">글쓰기</div>
                    <form onSubmit={handleSubmit} className="mb-4 mx-16 flex-col justify-start">
                        <div className="mt-2 flex justify-end text-base">
                            <label htmlFor="writer" className="font-omyu_pretty text-lg mt-4 font-extrabold text-[#b8b6b6]">작성자 : {writer}</label>
                        </div>
                        <div className="flex">
                            <div className="w-full">
                                <label htmlFor="title" className="mb-4 w-12 block text-black text-lg font-extrabold">제목</label>
                            <div className="flex">
                                <label htmlFor="category" className="" ></label>
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="mr-6 border-2 font-bold text-black border-[#D9D9D9] rounded-xl px-4 py-2"
                                >
                                    <option value="daily">일상</option>
                                    <option value="tip">꿀팁</option>
                                    <option value="recruit">모집</option>
                                    <option value="proud">자랑</option>
                                    <option value="question">질문</option>
                                </select>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={handleTitleChange}
                                    className="placeholder:text-gray-300 px-2 text-base py-2 placeholder-center rounded-lg border-2 w-[100%] block bg-white border-[#D9D9D9] shadow-sm"
                                    placeholder="제목을 입력하세요 ( 최대 50자 이내 )"
                                    required
                                    />
                                {/* {titleError && <div className="tooltip">{titleError}</div>} */}
                                    </div>
                            </div>
                        </div>
                        <div className="">
                            <label htmlFor="contents" className="mt-4 mb-4 w-12 block text-lg font-extrabold text-black">내용</label>
                            <textarea
                                id="contents"
                                name="contents"
                                rows={15}
                                value={contents}
                                onChange={handleContentsChange}
                                className="resize-none h- placeholder:text-gray-300 px-2 bg-white placeholder-center rounded-lg border-2 mr-24 block w-full border-[#D9D9D9] shadow-sm"
                                placeholder="내용을 입력하세요 ( 최대 2000자 이내 )"
                                required
                            />
                            {/* {contentsError && <div className="tooltip">{contentsError}</div>} */}
                        </div>
                        <div className="flex justify-between mt-6">
                            <div className="font-omyu_pretty mt-2 mx-2 text-lg font-extrabold text-[#0404040]">
                                작성일 : {createDate}
                            </div>
                            <div className="font-omyu_pretty flex">
                                <button onClick={handleCancelButton} className="w-24 mb-3 text-[#7e7d7d] border-[#7e7d7d] rounded-md font-bold text-xl border-2 py-2 px-4 mr-2 transition duration-300 hover:text-[#555454] hover:border-[#555454]">
                                    취소
                                </button>
                            <button
                                type="submit"
                                className="w-24 mb-3 flex justify-center py-2 px-4 border-2 border-custom-blue text-xl font-extrabold rounded-md text-custom-blue bg-white transition duration-700 hover:border-sky-100 hover:text-white hover:bg-custom-gradient"
                            >
                                글쓰기
                            </button>
                            </div>
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
