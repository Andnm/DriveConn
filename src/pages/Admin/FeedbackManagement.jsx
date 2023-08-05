import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { getFeedbacks, updateNewFeedback } from '../../api/feedback';
import LoadingCar from '../../components/LoadingCar/LoadingCar';
import '../styles/feedback.css';
import avatar from '../../assets/all-images/avatar.jpg'

const FeedbackManagement = () => {
    const { currentToken } = useContext(AuthContext);
    const [dataFeedback, setDataFeedback] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentFilter, setCurrentFilter] = useState('All');

    useEffect(() => {
        setIsLoading(true);
        getFeedbacks(currentToken)
            .then((res) => {
                const sortedFeedbacks = res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setDataFeedback(sortedFeedbacks);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [currentToken]);

    const handleFeedbackClick = (id) => {
        const feedbackToUpdate = dataFeedback.find((feedback) => feedback._id === id);
        if (feedbackToUpdate && feedbackToUpdate.newFeedback) {
            updateNewFeedback(currentToken, id).then((updatedFeedback) => {
                setDataFeedback((prevDataFeedback) =>
                    prevDataFeedback.map((feedback) =>
                        feedback._id === id ? { ...updatedFeedback, newFeedback: false } : feedback
                    )
                );
            });
        }
    };

    const handleFilterAll = () => {
        setCurrentFilter('All');
    };

    const handleFilterUnseen = () => {
        setCurrentFilter('Unseen');
    };

    const filteredFeedbacks = currentFilter === 'Unseen' ? dataFeedback.filter((feedback) => feedback.newFeedback) : dataFeedback;

    return (
        <div className="feedback-management">
            {isLoading ? (
                <LoadingCar />
            ) : (
                <div>
                    <div className="feedback-header">
                        <h2>Feedback Management</h2>
                        <button className={`all ${currentFilter === 'All' ? 'active' : ''}`} onClick={handleFilterAll}>
                            All
                        </button>
                        <button className={`unseen ${currentFilter === 'Unseen' ? 'active' : ''}`} onClick={handleFilterUnseen}>
                            Unseen
                        </button>
                    </div>
                    <div className="feedback-list">
                        {filteredFeedbacks.length === 0 && currentFilter === 'Unseen' ? (
                            <p className='empty-feedback'>Don't have any new feedback</p>
                        ) : (
                            filteredFeedbacks.map((feedback, index) => (
                                <div
                                    key={index}
                                    className={`feedback-item ${feedback.newFeedback ? 'unread-feedback' : 'read-feedback'}`}
                                    onClick={() => handleFeedbackClick(feedback._id)}
                                >
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <div className="avatar">
                                            {feedback?.avatar ? (
                                                <img src={feedback?.avatar} alt="Avatar User" />
                                            ) : (
                                                <img src={avatar} alt="Avatar Sample" />
                                            )}
                                        </div>
                                        <div className="feedback-info">
                                            <p>Fullname: {feedback.fullName}</p>
                                            <p>Email: {feedback.email}</p>
                                        </div>
                                    </div>
                                    <p className="content-feedback">Feedback content: {feedback.contentFeedback}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );

};

export default FeedbackManagement;
