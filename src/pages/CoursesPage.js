import React, { useState, useEffect } from "react";
import { Search, Filter, Clock, Users, Star, CheckCircle } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const CoursesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { id: "all", name: "All Courses" },
    { id: "web", name: "Web Development" },
    { id: "mobile", name: "Mobile Development" },
    { id: "ai", name: "AI & Machine Learning" },
    { id: "cybersecurity", name: "Cyber Security" },
    { id: "data", name: "Data Science & Analytics" },
    { id: "devops", name: "DevOps & Cloud" },
    { id: "design", name: "UI/UX Design" },
    { id: "marketing", name: "Digital Marketing" },
    { id: "ecommerce", name: "E-Commerce" },
    { id: "creative", name: "Creative & Media" },
    { id: "programming", name: "Programming" },
    { id: "game-dev", name: "Game Development" },
    { id: "business", name: "Business & Entrepreneurship" },
    { id: "it", name: "IT Fundamentals" },
    { id: "testing", name: "QA & Testing" },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const fetchedCourses = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
            title: data.name, // Map Firestore 'name' to 'title' for UI
          };
        });
        setCourses(fetchedCourses);
      } catch (err) {
        setError("Failed to load courses. Please try again later.");
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses =
    selectedCategory === "all"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return (
    <div className="pt-24 pb-16">
      {loading && (
        <div className="text-center py-24 text-xl font-bold">
          Loading courses...
        </div>
      )}
      {error && (
        <div className="text-center py-24 text-xl font-bold text-red-600">
          {error}
        </div>
      )}
      {!loading && !error && (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
            <div className="container-custom text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Our Courses
              </h1>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Explore our comprehensive IT courses designed to launch your
                tech career
              </p>
            </div>
          </section>

          {/* Courses Section */}
          <section className="section-padding">
            <div className="container-custom">
              {/* Search and Filter */}
              <div className="mb-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                  <div className="flex-1 max-w-2xl">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search courses..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <select
                      className="border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full font-medium transition-all ${
                        selectedCategory === category.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Courses Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course, index) => (
                  <div
                    key={course.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 card-hover"
                  >
                    {/* Course Header */}
                    <div className="relative">
                      <div className="relative h-48 overflow-hidden group">
                        {/* Image container with hover effect */}
                        <div className="relative w-full h-full">
                          <img
                            src={
                              course.image ||
                              "https://via.placeholder.com/400x300?text=No+Image"
                            }
                            alt={course.title || course.name || "Course"}
                            className="w-full h-full object-cover transform transition-all duration-700 ease-in-out group-hover:scale-110"
                          />
                          {/* Dark overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>

                        {/* Popular badge */}
                        {course.popular && (
                          <div className="absolute top-4 right-4 z-10">
                            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Popular
                            </span>
                          </div>
                        )}

                        {/* Course ID badge */}
                        <div className="absolute -bottom-3 left-6 z-20">
                          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold">
                              {index + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-6 pt-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                          {course.category
                            ? course.category.toUpperCase()
                            : "N/A"}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {course.level || "N/A"}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-2">
                        {course.title || course.name || "No Title"}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                        {course.description || "No description available."}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(course.features || []).map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded flex items-center"
                          >
                            <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Course Details */}
                      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span>{course.duration || "N/A"}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span>
                            {course.students
                              ? `${course.students} students`
                              : "N/A"}
                          </span>
                        </div>
                      </div>

                      {/* Rating and Price */}
                      <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          <span className="font-bold">
                            {course.rating || "N/A"}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {course.students
                              ? `(${Math.floor(Number(course.students) / 10)})`
                              : ""}
                          </span>
                        </div>
                      </div>

                      {/* Enroll Button */}
                      <button className="w-full mt-4 btn-primary">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 dark:text-gray-600 mb-4">
                    No courses found in this category
                  </div>
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="btn-primary"
                  >
                    View All Courses
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gray-50 dark:bg-gray-800 section-padding">
            <div className="container-container text-center">
              <h2 className="text-3xl font-bold mb-4">
                Need Help Choosing a Course?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                Our career advisors are here to help you choose the right course
                based on your goals and background.
              </p>
              <button className="btn-primary">
                Schedule Free Consultation
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default CoursesPage;
