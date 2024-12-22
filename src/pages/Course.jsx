import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AppRoutes } from '../constant/constant';
import { AuthContext } from '../context/AuthContext';

const Course = () => {
    const { setUser } = useContext(AuthContext);
    const [course, setCourse] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCourse, setNewCourse] = useState({ title: '', description: '', thumbnail: '' });

    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = () => {
        axios
            .get(AppRoutes.getCourse, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                if (Array.isArray(res.data.data)) {
                    setCourse(res.data.data); // Set the 'data' property as the course array
                } else {
                    console.error('API did not return a valid array:', res.data);
                    setCourse([]); // Fallback to an empty array
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };




    const handleAddCourse = () => {
        axios
            .post(AppRoutes.addCourse, newCourse, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            })
            .then((res) => {
                setIsModalOpen(false); // Close the modal
                getCourses(); // Refresh the course list
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Course Page</h1>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
                Add Course
            </button>

            <button
                onClick={() => {
                    Cookies.set('token', null);
                    setUser(null);
                }}
                className="bg-indigo-600 ml-10 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
                Log Out
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-xl font-bold mb-4">Add New Course</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                value={newCourse.title}
                                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                                className="mt-1 p-2 w-full border border-gray-300 rounded"
                                placeholder="Enter course title"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                value={newCourse.description}
                                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                                className="mt-1 p-2 w-full border border-gray-300 rounded"
                                placeholder="Enter course description"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
                            <input
                                type="text"
                                value={newCourse.thumbnail}
                                onChange={(e) => setNewCourse({ ...newCourse, thumbnail: e.target.value })}
                                className="mt-1 p-2 w-full border border-gray-300 rounded"
                                placeholder="Enter thumbnail URL"
                            />
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddCourse}
                                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                            >
                                Add Course
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Course List */}
            <div className="mt-6 flex">
                {Array.isArray(course) && course.length > 0 ? (
                    course.map((courseItem) => (
                        <div key={courseItem.id} className="border p-4 mb-4 w-full rounded shadow">
                            <h2 className="text-lg font-bold">{courseItem.title}</h2>
                            <p className="text-sm text-gray-700">{courseItem.description}</p>
                            {courseItem.thumbnail && (
                                <img
                                    src={courseItem.thumbnail}
                                    alt={`${courseItem.title} Thumbnail`}
                                    className="mt-2 w-[200px] h-auto rounded"
                                />
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No courses available.</p>
                )}
            </div>
        </div>
    );
};

export default Course;
