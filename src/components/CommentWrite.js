import { useState } from "react"

const CommentWrite = ({ onCommentSubmit }) => {

    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        onCommentSubmit(newComment.trim());
        setNewComment('');
    }

    return (
        <div className="mt-6">
            <form onSubmit={handleSubmit} className="flex">
                <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요"
                    className="ml-80 mt-4 text-md placeholder-center rounded-lg border-2 border-gray-400 w-full px-5"
                />
                <button type='submit' className='font-omyu_pretty mr-80 mx-6 w-40 text-2xl mt-4 py-2 rounded-lg border-2 border-custom-blue bg-custom-blue text-white transition duration-300 hover:border-custom-blue hover:bg-white hover:text-custom-blue'>
                    등 록
                </button>
            </form>
        </div>
    )
}

export default CommentWrite
