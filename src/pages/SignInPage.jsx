import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Trophy, ArrowRight } from 'lucide-react';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, updateProfile  } from 'firebase/auth';

const SignInPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (isSignUp && !formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (isSignUp && formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
  if (isSignUp) {
    await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    await updateProfile(auth.currentUser, { displayName: formData.name });
    alert('Account created!');
  } else {
    await signInWithEmailAndPassword(auth, formData.email, formData.password);
    alert('Signed in!');
  }

  // ✅ Store user info for Navbar
  const userInfo = auth.currentUser;
  localStorage.setItem('user', JSON.stringify({
    displayName: userInfo.displayName || formData.name || 'User',
    email: userInfo.email
  }));

} catch (error) {
  alert(error.message);
} finally {
  setIsLoading(false);
}

  };

  const handleGoogleSignIn = async () => {
  setIsLoading(true);
  try {
    // Sign in with Google
    const result = await signInWithPopup(auth, googleProvider);

    // Get user info from Firebase
    const userInfo = result.user;

    // Store in localStorage for Navbar
    localStorage.setItem(
      'user',
      JSON.stringify({
        displayName: userInfo.displayName || 'User',
        email: userInfo.email
      })
    );

    alert(`Signed in as ${userInfo.displayName || 'User'}!`);
  } catch (error) {
    alert(error.message);
  } finally {
    setIsLoading(false);
  }
};


  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E9E7F9] to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6 hover:opacity-80 transition-opacity">
            <Trophy className="h-10 w-10 text-[#0FD354]" />
            <span className="text-2xl font-bold text-[#16113A]">SkillProof</span>
          </Link>
          <h1 className="text-3xl font-bold text-[#16113A] mb-2">{isSignUp ? 'Create Account' : 'Welcome Back'}</h1>
          <p className="text-gray-600">{isSignUp ? 'Join thousands of developers proving their skills' : 'Sign in to continue your journey'}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#16113A]">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#0FD354]'}`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#16113A]">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#0FD354]'}`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-[#16113A]">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#0FD354]'}`}
                  placeholder="Enter your password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            {isSignUp && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#16113A]">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.confirmPassword ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#0FD354]'}`}
                    placeholder="Confirm your password"
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0FD354] text-[#16113A] py-3 rounded-xl font-semibold text-lg hover:bg-[#0FD354]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? <div className="w-6 h-6 border-2 border-[#16113A]/20 border-t-[#16113A] rounded-full animate-spin"></div> : <><span>{isSignUp ? 'Create Account' : 'Sign In'}</span><ArrowRight className="h-5 w-5" /></>}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <div className="space-y-3">
            <button onClick={handleGoogleSignIn} className="w-full border-2 border-gray-200 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button type="button" onClick={toggleMode} className="text-[#00D1FF] hover:text-[#00D1FF]/80 font-semibold transition-colors">
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By continuing, you agree to our{' '}
            <Link to="/terms" className="text-[#00D1FF] hover:text-[#00D1FF]/80 transition-colors">Terms of Service</Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-[#00D1FF] hover:text-[#00D1FF]/80 transition-colors">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
