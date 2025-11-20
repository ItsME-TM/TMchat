import React, { useState } from 'react'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer'
import { useAuthStore } from '../store/useAuthStore';
import { LoaderIcon, MessageCircleIcon, UserIcon } from 'lucide-react';
import { Link } from 'react-router';

function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });
  const {signup, isSigningUp} = useAuthStore();
  const handleSubmit = (e) => {
    //Stop page refresh after form submit
    e.preventDefault();
    signup(formData);
  }
  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-slate-900">
        <div className="relative w-full max-w-6xl md:h-[800px] lg:h-[565px] h-[600px] ">
          <BorderAnimatedContainer>

            {/* For small display one column and for large display two columns */}
            <div className = "w-full flex flex-col md:flex-row">

              {/* Left Side - Form */}
              <div className="lg:w-1/2 p-4 flex items-center justify-center md:border-r border-slate-600/30">
                <div className="w-full max-w-md">
                  <div className="text-center mb-6">

                    {/* Icon and Heading */}
                    <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-3"/>
                    <h2 className="text-xl font-bold text-slate-200">Create Account</h2>
                    <p className="">Sign up for a new account</p>
                  </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Full Name Input */}
                      <div>
                        <label className="auth-input-label">Full Name</label>
                        <div className="relative">
                          <UserIcon className="auth-input-icon"/>
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value})}
                            className="input"
                            placeholder="Thushan Malaka"
                          />
                        </div>
                      </div>
                      {/* Email Input */}
                      <div>
                        <label className="auth-input-label">Email</label>
                        <div className="relative">
                          <UserIcon className="auth-input-icon"/>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value})}
                            className="input"
                            placeholder="thushan@gmail.com"
                          />
                        </div>
                      </div>
                      {/* Password */}
                      <div>
                        <label className="auth-input-label">Password</label>
                        <div className="relative">
                          <UserIcon className="auth-input-icon"/>
                          <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value})}
                            className="input"
                            placeholder="Enter your password"
                          />
                        </div>
                      </div>
                      {/* Submit Button */}
                      <button className="auth-btn" type="submit" disabled={isSigningUp}>
                        {isSigningUp ? (
                          <LoaderIcon className="w-full h-5 animate-spin text-center"/> ) : (
                            "Create Account"
                        )}
                      </button>
                    </form>
                    <div className="mt-6 text-center">
                      <Link to="/login" className="auth-link">
                        Already have an account? Log in
                      </Link>
                    </div>
                </div>
              </div>

              {/* Right Side - Image */}
                <div className="hidden md:w-1/2 md:flex items-center justify-center p-24 bg-gradient-to-bl from-slate-800/20 to-transparent">
                  <div>
                    <img
                      src="/signup.png"
                      alt="People using mobile devices"
                      className="w-full h-auto object-contain"
                    />
                    <div className="mt-6 text-center">
                      <h3 className="text-xl font-medium text-cyan-400">Start Connecting Today</h3>

                      <div className="mt-4 flex justify-center gap-4">
                        <span className="auth-badge">Free</span>
                        <span className="auth-badge">Easy Setup</span>
                        <span className="auth-badge">Private</span>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </BorderAnimatedContainer>
        </div>
    </div>
  )
}

export default SignUpPage
