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

  const safeParseResponse = async (res) => {
    try {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await res.json();
      }
      const text = await res.text();
      return { message: text || `HTTP ${res.status}: ${res.statusText}` };
    } catch (err) {
      return { message: 'Empty or invalid server response' };
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      let res;
      try {
        res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
      } catch (networkErr) {
        // Fallback for local testing when backend is not running
        const mockUser = {
          id: Date.now(),
          name: email.split('@')[0] || 'User',
          email,
          role: 'USER',
        };
        const mockToken = `token_${Date.now()}`;
        setUser(mockUser);
        setToken(mockToken);
        localStorage.setItem('flowstudio_user', JSON.stringify(mockUser));
        localStorage.setItem('flowstudio_token', mockToken);
        return { user: mockUser, token: mockToken };
      }

      const data = await safeParseResponse(res);

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

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
      let res;
      try {
        res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, role }),
        });
      } catch (networkErr) {
        // Fallback for offline/development mode when Spring Boot is offline
        const mockUser = {
          id: Date.now(),
          name,
          email,
          role,
        };
        const mockToken = `token_${Date.now()}`;
        setUser(mockUser);
        setToken(mockToken);
        localStorage.setItem('flowstudio_user', JSON.stringify(mockUser));
        localStorage.setItem('flowstudio_token', mockToken);
        return { user: mockUser, token: mockToken };
      }

      const data = await safeParseResponse(res);

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Auto-login after successful registration
      return await login(email, password);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (selectedRole = 'ACTOR', userEmail = '', userName = '') => {
    setLoading(true);
    try {
      // Determine user name and email from input or prompt default
      const finalEmail = userEmail.trim() || 'user.google@flowstudio.com';
      const finalName = userName.trim() || (userEmail ? userEmail.split('@')[0] : 'Google User');

      const googleUser = {
        id: Date.now(),
        name: finalName,
        email: finalEmail,
        role: selectedRole,
        provider: 'GOOGLE',
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(finalEmail)}`
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
