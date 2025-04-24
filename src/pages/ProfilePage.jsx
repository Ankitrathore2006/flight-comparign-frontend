import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Calendar, Shield, LogOut, MapPin, Phone, Globe, Briefcase, Plane, Image, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

// Default avatar image
const DEFAULT_AVATAR = "/avatar.png";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile, logout } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      setImageError(false);
      try {
        await updateProfile({ profilePic: base64Image });
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile picture');
        setSelectedImg(null);
        setImageError(true);
      }
    };

    reader.onerror = () => {
      console.error('Error reading file');
      alert('Error reading file');
      setImageError(true);
    };
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to logout');
    }
  };

  // Format date to be more readable
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleImageError = (e) => {
    console.error('Error loading profile image');
    e.target.src = DEFAULT_AVATAR;
    setImageError(true);
  };

  if (isLoading) {
    return (
      <div className="profile-container">
        <div className="profile-wrapper">
          <div className="flex items-center justify-center h-screen">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="relative group">
              <div className="profile-image-container">
                <img
                  src={selectedImg || authUser?.profilePic || DEFAULT_AVATAR}
                  alt="Profile"
                  className="profile-image"
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>
              
                <label
                  htmlFor="avatar-upload"
                  className={`upload-button ${isUpdatingProfile ? "uploading" : ""}`}
                  title="Upload new photo"
                >
                  <Camera className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
            </div>

            {/* User Info */}
            <div className="user-info">
              <h1 className="user-name">{authUser?.fullName || 'User'}</h1>
              <p className="user-email">{authUser?.email || 'No email provided'}</p>
              <div className="button-container">
                <span className="member-badge">Premium Member</span>
                <button
                  onClick={handleLogout}
                  className="logout-button"
                  title="Logout"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="profile-details">
          {/* Personal Information */}
          <div className="detail-card">
            <h2 className="card-title">
              <User size={20} />
              Personal Information
            </h2>
            <div className="space-y-6">
              <div className="info-item">
                <div className="info-icon">
                  <User size={18} />
                </div>
                <div>
                  <p className="info-label">Full Name</p>
                  <p className="info-value">{authUser?.fullName || 'Not provided'}</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="info-label">Email Address</p>
                  <p className="info-value">{authUser?.email || 'Not provided'}</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="info-label">Phone Number</p>
                  <p className="info-value">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="info-label">Location</p>
                  <p className="info-value">New York, USA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="detail-card">
            <h2 className="card-title">
              <Shield size={20} />
              Account Information
            </h2>
            <div className="space-y-6">
              <div className="info-item">
                <div className="info-icon">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="info-label">Member Since</p>
                  <p className="info-value">
                    {formatDate(authUser?.createdAt)}
                  </p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <Shield size={18} />
                </div>
                <div>
                  <p className="info-label">Account Status</p>
                  <p className="info-value text-green-600">Active</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <Globe size={18} />
                </div>
                <div>
                  <p className="info-label">Language</p>
                  <p className="info-value">English (US)</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <Briefcase size={18} />
                </div>
                <div>
                  <p className="info-label">Membership Type</p>
                  <p className="info-value">Premium</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-card">
          <h2 className="activity-title">Recent Activity</h2>
          <div className="space-y-4">
            <div className="activity-item blue">
              <p className="activity-item-title">Booked a flight</p>
              <p className="activity-item-description">New York (JFK) to London (LHR)</p>
              <p className="activity-item-time">2 days ago</p>
            </div>
            <div className="activity-item green">
              <p className="activity-item-title">Updated profile picture</p>
              <p className="activity-item-description">Changed your profile photo</p>
              <p className="activity-item-time">5 days ago</p>
            </div>
            <div className="activity-item purple">
              <p className="activity-item-title">Earned reward points</p>
              <p className="activity-item-description">+500 points for booking milestone</p>
              <p className="activity-item-time">1 week ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
