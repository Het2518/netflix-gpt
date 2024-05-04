import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, addDoc, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const CommentSection = ({ movieId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const db = getFirestore();
    const auth = getAuth();

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const commentsQuery = query(
                collection(doc(collection(db, 'movies'), movieId), 'comments'),
                orderBy('timestamp', 'desc') // Order by timestamp to show the latest comments first
            );
            const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
                const comments = snapshot.docs.map((doc) => ({ id: doc.id,...doc.data() }));
                setComments(comments);
            });
            return unsubscribe;
        }
    }, [db, movieId, auth]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            const user = auth.currentUser;
            if (user) {
                const commentData = {
                    text: newComment,
                    username: user.displayName || 'Anonymous',
                    timestamp: new Date().toISOString(), // Convert to ISO string for easier handling
                    userId: user.uid,
                };
                const commentsRef = collection(doc(collection(db, 'movies'), movieId), 'comments');
                await addDoc(commentsRef, commentData);
                // After successfully adding the comment, update the local state to include the new comment
                const commentSnapshot = await getDocs(commentsRef);
                const commentsList = commentSnapshot.docs.map(doc => ({ id: doc.id,...doc.data() }));
                setComments(commentsList);
                setNewComment(''); // Clear the input field
            } else {
                console.log('User not logged in');
            }
        }
    };

    return (
        <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            <form onSubmit={handleCommentSubmit} className="flex mb-4">
                <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="flex-grow px-4 py-2 rounded-l-md bg-gray-800 text-white"
                />
                <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-r-md"
                >
                    Submit
                </button>
            </form>
            <div>
                {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-800 p-4 rounded-md mb-2">
                        <p className="text-gray-400">{comment.username}</p>
                        <p>{comment.text}</p>
                        <p className="text-gray-500">Posted at: {new Date(comment.timestamp).toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
