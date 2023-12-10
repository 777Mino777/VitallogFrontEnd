import { useState } from "react";

const CommentList = ({ comments, onDeleteComment, onEditComment, userId }) => {
    const [editing, setEditing] = useState(null);
    const [editText, setEditText] = useState('');

    const handleEdit = (comment) => {
        setEditing(comment.id);
        setEditText(comment.contents);
    };

    const handleSave = () => {
        onEditComment(editing, editText);
        setEditing(null);
        setEditText('');
    }

    return (
        <div>
            <div className="font-omyu_pretty text-center text-2xl  mt-4 mx-80 w-fit border-b-4 border-sky-200"> 댓글 {comments.length}개</div>
            <div className="mt-4 mx-48 mb-96">
                {comments.map((comment, index) => (
                    <div key={index} className="mx-32 rounded-xl flex border-4 border-sky-100 mt-4 pl-2 py-1 mb-4">
                        {editing === comment.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    className="flex-1"
                                />
                                <button onClick={handleSave} className="font-omyu_pretty underline mr-2">저장</button>
                            </>
                        ) : (
                            <>
                                <div className="font-omyu_pretty font-bold">{comment.writer}</div>
                                <div className="font-omyu_pretty font-bold text-sky-200">&nbsp; | &nbsp;</div>
                                <div className="text-xs flex flex-col justify-center w-[65rem]">{comment.contents}</div>
                                {comment.writer === userId && (
                                    <div className="flex w-[4rem] justify-end">
                                        <button className="font-omyu_pretty underline" onClick={() => handleEdit(comment)}>수정</button>
                                        <button className="font-omyu_pretty ml-2 underline" onClick={() => onDeleteComment(comment.id)}>삭제</button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentList
