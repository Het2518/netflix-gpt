import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    doc,
} from 'firebase/firestore';
import { db } from '../utils/firebase';

const CommentSection = ({ movieId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const auth = getAuth();

    useEffect(() => {
        if (!movieId) return;

        const movieRef = doc(db, 'movies', movieId);
        const commentsRef = collection(movieRef, 'comments');
        const q = query(commentsRef, orderBy('timestamp', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const commentsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setComments(commentsData);
        });

        return () => unsubscribe();
    }, [movieId]);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!auth.currentUser) {
            // Handle user not logged in
            return;
        }

        if (newComment.trim()) {
            const movieRef = doc(db, 'movies', movieId);
            const commentsRef = collection(movieRef, 'comments');

            await addDoc(commentsRef, {
                text: newComment,
                userId: auth.currentUser.uid,
                username: auth.currentUser.displayName || 'Anonymous',
                timestamp: new Date().toISOString()
            });

            setNewComment('');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmitComment} className="mb-6">
        <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-red-500 focus:outline-none"
            rows="3"
        />
                <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
                >
                    Post Comment
                </button>
            </form>

            <div className="space-y-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="p-4 bg-gray-800 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-white">{comment.username}</span>
                            <span className="text-gray-400 text-sm">
                {new Date(comment.timestamp).toLocaleDateString()}
              </span>
                        </div>
                        <p className="text-gray-300">{comment.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;