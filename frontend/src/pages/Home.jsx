import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-6 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Welcome to NotePro
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Your all-in-one solution for taking, organizing, and managing notes effortlessly.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="/register"
              className="px-6 py-3 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-md text-indigo-600 bg-white hover:bg-gray-100 transition-colors border border-indigo-600"
            >
              Sign In
            </Link>
          </div>
        </motion.div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Create and Edit Notes</h2>
            <p className="text-gray-600">
              Easily create new notes with a rich text editor and intuitive formatting options.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Organize with Categories</h2>
            <p className="text-gray-600">
              Categorize your notes for easy access and better organization.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Secure Authentication</h2>
            <p className="text-gray-600">
              Securely access your notes with our robust authentication system.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Edit and Delete Notes</h2>
            <p className="text-gray-600">
              Edit and delete notes easily.
            </p>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-12"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Sign up today and experience the best way to manage your notes.
          </p>
          <Link
            to="/register"
            className="px-8 py-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Create Your Free Account
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;