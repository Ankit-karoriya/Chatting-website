import { useState } from 'react';
import Alert from './Alert.jsx';
import axios from 'axios';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [fullname, setFullname] = useState('');
  const [fullnameError, setFullnameError] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({status: '', message: ''})

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z0-9]*$/.test(value)) {
      setUsername(value);
      setUsernameError('');
    }
    else {
      setUsernameError('Only letters and numbers are allowed');
    }
  };

  const handleFullnameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z ]*$/.test(value)) {
      setFullname(value);
      setFullnameError('');
    }
    else {
      setFullnameError('Only letters and spaces are allowed');
    }
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('fullname', fullname);
    formData.append('password', password);
    formData.append('profileImage', e.target.profileImage.files[0]);
    axios
      .post('http://localhost:8000/api/users/register', formData, {headers: {"Content-Type": "multipart/form-data"}})
      .then((response) => {
        setAlert({status: 'success', message: response.data.message})
      })
      .catch((error) => {
        setAlert({status: 'error', message: error.response.data.message || 'something went wrong'})
      })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {
        alert.status && <Alert onClose={()=>setAlert({alertStatus: '', message: ''})} alertStatus={alert.status} message={alert.message}/>
      }
      <form
        className="bg-white dark:bg-gray-600 shadow-2xl rounded-2xl p-8 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-green-500">
          Create Account
        </h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            onBlur={() => setUsernameError('')}
            placeholder="Enter a username"
            pattern='^[A-Za-z0-9]+$'
            required
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none ${usernameError ? "border-red-500 focus:ring-red-400" : ""}`}
          />
          {
            usernameError && <p className='text-sm text-red-500 dark:text-red-900 mt-1'>{usernameError}</p>
          }
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
          <input
            type="text"
            name="fullname"
            placeholder="Enter your full name"
            required
            value={fullname}
            onChange={handleFullnameChange}
            onBlur={() => setFullnameError('')}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none ${fullnameError ? "border-red-500 focus:ring-red-400" : ""} `}
          />
          {
            fullnameError && <p className='text-sm text-red-500 dark:text-red-900 mt-1'>{fullnameError}</p>
          }
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 mb-1">Profile Image</label>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            className="w-full text-gray-700 dark:text-gray-300"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
