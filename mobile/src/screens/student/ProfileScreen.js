import React from "react";
import {
  ArrowLeft,
  Settings,
  Share2,
  Award,
  BookOpen,
  Clock,
  Users,
  TrendingUp,
  Calendar,
  MapPin,
  Star,
} from "lucide-react";

export default function ProfileScreen() {
  const stats = [
    {
      label: "Courses Completed",
      value: "8",
      change: "+3",
      color: "bg-blue-500",
    },
    {
      label: "Study Hours",
      value: "124h",
      change: "+28h",
      color: "bg-orange-500",
    },
    { label: "Certificates", value: "5", change: "+2", color: "bg-purple-500" },
    {
      label: "Learning Progress",
      value: "75%",
      change: "+12%",
      color: "bg-green-500",
    },
  ];

  const recentActivities = [
    {
      title: "Completed Ethical Hacking Course",
      subtitle: "Professional Course by Prof. Mathew",
      date: "2 days ago",
      progress: 100,
      color: "bg-green-500",
    },
    {
      title: "Started Data Analysis Fundamentals",
      subtitle: "By Prof. Jones",
      date: "1 week ago",
      progress: 25,
      color: "bg-blue-500",
    },
    {
      title: "Earned Cyber Security Certificate",
      subtitle: "Advanced Level Certification",
      date: "2 weeks ago",
      progress: 100,
      color: "bg-purple-500",
    },
  ];

  const achievements = [
    {
      icon: Award,
      title: "Fast Learner",
      description: "Completed 3 courses in a month",
    },
    { icon: Star, title: "Top Performer", description: "95% average score" },
    {
      icon: TrendingUp,
      title: "Consistent",
      description: "30-day learning streak",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">Profile</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Share2 size={20} />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Header */}
      <div className="relative px-4 pt-6">
        <div className="relative rounded-3xl mb-6 overflow-hidden">
          {/* Mountain landscape background */}
          <div
            className="h-80 bg-cover bg-center relative"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6)), 
                               linear-gradient(45deg, #4F46E5 0%, #7C3AED 25%, #EC4899 50%, #F59E0B 75%, #10B981 100%),
                               radial-gradient(circle at 30% 70%, #1E293B 0%, #334155 40%, #64748B 100%)`,
            }}
          >
            {/* Mountain silhouette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>

            {/* Top icons */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
              <div className="w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Share2 size={20} className="text-white" />
              </div>
              <div className="w-10 h-10 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Settings size={20} className="text-white" />
              </div>
            </div>

            {/* Profile Image - Centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 backdrop-blur-sm bg-white/10">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                  alt="Christian Slater"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* User info at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <h2 className="text-3xl font-bold text-white mb-1">
                Christian Slater
              </h2>
              <div className="flex items-center justify-center text-white/80 text-lg">
                <MapPin size={18} className="mr-2" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Small profile pictures in corner */}
            <div className="absolute bottom-6 left-6 flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b64c?w=50&h=50&fit=crop&crop=face"
                  alt="Friend 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face"
                  alt="Friend 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face"
                  alt="Friend 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Users size={14} className="text-white" />
              </div>
            </div>
          </div>

          {/* Stats section - white background */}
          <div className="bg-white rounded-b-3xl px-6 py-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">1,250</div>
                <div className="text-gray-500 text-sm">Activities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">239</div>
                <div className="text-gray-500 text-sm">Experiences</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">125</div>
                <div className="text-gray-500 text-sm">Followers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="px-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50"
            >
              <div
                className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}
              >
                {stat.label.includes("Courses") && <BookOpen size={20} />}
                {stat.label.includes("Hours") && <Clock size={20} />}
                {stat.label.includes("Certificates") && <Award size={20} />}
                {stat.label.includes("Progress") && <TrendingUp size={20} />}
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 mb-1">{stat.label}</div>
              <div className="text-xs text-green-400">{stat.change}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="px-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Achievements</h3>
        <div className="space-y-3">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 flex items-center space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                  <Icon size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-white">
                    {achievement.title}
                  </div>
                  <div className="text-sm text-gray-400">
                    {achievement.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="px-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50"
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`w-12 h-12 ${activity.color} rounded-xl flex items-center justify-center flex-shrink-0`}
                >
                  <BookOpen size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white mb-1">
                    {activity.title}
                  </div>
                  <div className="text-sm text-gray-400 mb-2">
                    {activity.subtitle}
                  </div>
                  <div className="text-xs text-gray-500 mb-2">
                    {activity.date}
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${activity.color}`}
                      style={{ width: `${activity.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {activity.progress}% Complete
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-6">
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25">
            View All Courses
          </button>
          <button className="bg-gray-800 text-white font-semibold py-4 px-6 rounded-2xl border border-gray-700 transition-all duration-200 hover:bg-gray-700">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
