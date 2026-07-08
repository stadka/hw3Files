import personalPhoto from "../../assets/personalPhoto.jpg";

export function Home() {
  const msDegrees = [
    { name: "MS in Computer Science", code: "CS-MS" },
    { name: "MS in Data Analytics Engineering", code: "DAE-MS" },
    { name: "MS in Information Systems", code: "ISA-MS" },
    { name: "MS in Software Engineering", code: "SWE-MS" },
  ];

  const requiredCourses = [
    { code: "CS 530", name: "Mathematical Foundations of Computer Science", credits: 3 },
    { code: "CS 531", name: "Computer Systems and Fundamentals", credits: 3 },
    { code: "CS 580", name: "Introduction to Artificial Intelligence", credits: 3 },
    { code: "CS 583", name: "Analysis of Algorithms", credits: 3 },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* About me Section */}
      <section className="mb-12">
        <h2 className="gmu-section-header">Profile</h2>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="w-40 h-40 rounded-lg border-2 border-dashed border-gray-400 flex items-center justify-center text-sm text-gray-500 bg-gray-50">
              <img src={personalPhoto} alt="Personal Photo" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#006633] mb-3">Satwik Tadikamalla</h3>
              <p className="text-gray-700 leading-relaxed">
                I am currently a software engineer and am pursuing my MS in Computer Science at George Mason University. 
                I graduated from Virginia Tech with a BS in Computer Science in 2023.
                In my free time, I enjoy playing sports and trying new resturants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CS Department Info Section */}
      <section className="mb-16">
        <h2 className="gmu-section-header">Computer Science Department</h2>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-[#006633] mb-6">MS Degree Programs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {msDegrees.map((degree) => (
              <div
                key={degree.code}
                className="border-2 border-[#006633] rounded-lg p-6 hover:bg-[#006633] hover:text-white transition-colors duration-300"
              >
                <h4 className="text-xl font-bold mb-2">{degree.name}</h4>
                <p className="font-mono text-sm opacity-80">{degree.code}</p>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-[#006633] mb-6 mt-12">Required Courses</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#006633] text-white">
                  <th className="border border-[#006633] px-6 py-3 text-left">Course Code</th>
                  <th className="border border-[#006633] px-6 py-3 text-left">Course Name</th>
                  <th className="border border-[#006633] px-6 py-3 text-center">Credits</th>
                </tr>
              </thead>
              <tbody>
                {requiredCourses.map((course, index) => (
                  <tr
                    key={course.code}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="border border-gray-300 px-6 py-4 font-semibold text-[#006633]">
                      {course.code}
                    </td>
                    <td className="border border-gray-300 px-6 py-4">{course.name}</td>
                    <td className="border border-gray-300 px-6 py-4 text-center">{course.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}