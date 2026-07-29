import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('flowstudio_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('flowstudio_token') || null;
  });

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && token) {
      fetchUserProfile(user.id);
    }
  }, [user, token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await res.json();
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('flowstudio_user', JSON.stringify(data.user));
      localStorage.setItem('flowstudio_token', data.token);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, role = 'USER') => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await res.json();
      // Auto-login after registration
      return await login(email, password);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (selectedRole = 'DIRECTOR') => {
    setLoading(true);
    try {
      // Simulate/Process Google SSO OAuth Payload
      const googleUser = {
        id: 1,
        name: 'Alex Sterling (Google SSO)',
        email: 'alex.sterling.google@flowstudio.com',
        role: selectedRole,
        provider: 'GOOGLE',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
      };
      const googleToken = `google_jwt_${Date.now()}`;

      setUser(googleUser);
      setToken(googleToken);
      localStorage.setItem('flowstudio_user', JSON.stringify(googleUser));
      localStorage.setItem('flowstudio_token', googleToken);
      return { user: googleUser, token: googleToken };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setProfile(null);
    localStorage.removeItem('flowstudio_user');
    localStorage.removeItem('flowstudio_token');
  };

  const fetchUserProfile = async (userId) => {
    try {
      const res = await fetch(`/api/profiles/${userId}`, {
        headers: {
          'Authorization': token ? `Bearer ${token}` : '',
        },
      });
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
    }
  };

  const updateUserProfile = async (profileData) => {
    if (!user) return;
    try {
      const res = await fetch(`/api/profiles/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(profileData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const updated = await res.json();
      setProfile(updated);
      return updated;
    } catch (err) {
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      profile,
      loading,
      login,
      register,
      loginWithGoogle,
      logout,
      updateUserProfile,
      refreshProfile: () => user && fetchUserProfile(user.id)
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
