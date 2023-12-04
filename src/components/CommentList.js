
const CommentList = ({ comments, onDeleteComment, userId }) => {
    console.log(comments)
    return (
        <div>
            <div className="text-center text-3xl font-omyu_pretty mt-4 mx-48 w-fit border-b-4 border-sky-200"> 댓글 {comments.length}개</div>
            <div className="font-omyu_pretty mt-4 mx-48 mb-96">
                {comments.map((comment, index) => (
                    <div key={index} className="rounded-xl flex border-4 border-sky-100 mt-4 pl-2 py-1 mb-4">
                        <div className="font-bold">{comment.writer}</div>
                        <div className="font-bold text-sky-200">&nbsp; | &nbsp;</div>
                        <div>{comment.contents}</div>
                        {comment.writer === userId && (
                            <button className="" onClick={() => onDeleteComment(comment.id)}>&nbsp;❌</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentList
