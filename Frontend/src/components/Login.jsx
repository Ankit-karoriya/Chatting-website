import React from 'react'

function login() {
    return (
        <div className='flex h-screen items-center justify-center'>
            <form action="" className='border border-white px-6 py-2 rounded-md w-96'>
                <h1 className='text-2xl text-center'>Chatting <span className='text-green-500 font-semibold'>App</span></h1>
                <h2 className='text-xl text-white font-semibold'>login</h2>
                <br />

                {/* username */}
                <label className="input validator">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </g>
                    </svg>
                    <input
                        type="text"
                        required
                        placeholder="Username"
                        pattern="[A-Za-z][A-Za-z0-9\-]*"
                        minlength="3"
                        maxlength="20"
                        title="Only letters, numbers or dash"
                    />
                </label>
                <p className="validator-hint">
                    Must be 3 to 20 characters
                    <br />containing only letters, numbers or dash
                </p>

                {/* password */}
                <label className="input validator">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                            ></path>
                            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                        </g>
                    </svg>
                    <input
                        type="password"
                        required
                        placeholder="Password"
                        minlength="8"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                    />
                </label>
                <p className="validator-hint hidden">
                    Must be more than 8 characters, including
                    <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                </p>
                
                <br />
                <br />

                {/* Text and Button */}
                <div className='flex justify-between'>
                    <p>New User? <span className='text-blue-500 cursor-pointer underline'>Signup</span></p>
                    <input type="submit" value="login" className='text-white bg-green-500 px-2 py-1 cursor-pointer rounded-lg'/>
                </div>
            </form>
        </div>
    )
}

export default login
