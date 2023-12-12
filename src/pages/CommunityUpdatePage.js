import { useState } from "react";
import VlogNav from "./VlogNav"
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const CommunityUpdatePage = () => {

    const location = useLocation();
    const { post } = location.state || {};
    const { postid } = useParams();
    const { category } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState(post?.title || '');
    const [contents, setContents] = useState(post?.contents || '');
    const writer = localStorage.getItem("id");

    const handleSubmit = (e) => {

        e.preventDefault();

        const url = `http://10.125.121.216:8080/api/vitallog/community/board/${postid}`
        const Authorization = localStorage.getItem("token");

        console.log(url)

        const postBody = {
            title: title,
            contents: contents,
        };

        axios.put(url, postBody, {
            headers: {
                Authorization: Authorization,
            }
        })
            .then(response => {
                console.log(response);
                navigate(`/community/detail/${postid}/${category}`);
            })
            .then((data) => data)
            .catch((error) => {
                console.log(error);

            })

    };
    return (
        <div className="max-w-[1820px] mx-auto">
            <div className="flex flex-col min-h-screen bg-white text-gray-800">

                <header className="p-6">
                    <VlogNav isUserPage={true} />
                </header>

                <main className="shadow-md rounded-2xl mx-80 mt-20 bg-white border-2 border-sky-150 justify-center items-center text-center">
                    <div className="border-t-2 rounded-t-xl py-2 bg-custom-blue text-white text-2xl font-bold">게시물 수정</div>
                    <form onSubmit={handleSubmit} className="mt-12 mb-4 mx-12 flex-col justify-start">
                        <div className="">
                            <div className="mt-2 flex justify-end text-xl">
                                <label htmlFor="writer" className="font-omyu_pretty font-extrabold rounded-xl px-3 text-[#a3a3a3]">작성자 : {writer}</label>
                            </div>

                        </div>
                        <div className="">
                            <label htmlFor="title" className="rounded-xl mb-4 w-12 block text-black text-lg font-extrabold">제목</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="px-2 text-md py-2 placeholder-center rounded-lg border-2 w-full block border-[#d9d9d9] shadow-sm"
                                placeholder="제목을 입력하세요"
                                required
                            />
                        </div>
                        <div className="">
                            <label htmlFor="contents" className="mt-4 mb-4 w-12 block text-lg font-extrabold text-black">내용</label>
                            <textarea
                                id="contents"
                                name="contents"
                                rows={15}
                                value={contents}
                                onChange={(e) => setContents(e.target.value)}
                                className="resize-none px-2 text-sm placeholder-center rounded-lg border-2 mr-24 block w-full border-[#d9d9d9] shadow-sm"
                                placeholder="내용을 입력하세요"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="font-omyu_pretty w-28 mt-4 flex justify-center py-1 border-2 border-custom-blue text-xl font-extrabold rounded-md text-white bg-custom-blue transition duration-300 hover:text-custom-blue hover:bg-white"
                            >
                                수 정
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

export default CommunityUpdatePage
