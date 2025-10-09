"use client"
import Image from "next/image";
import '@/app/globals.css'
import "@/src/output.css";
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <div><section className="relative h-screen w-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="bg1.jpg"
            alt="Background"
            className="w-full h-screen object-cover"
          />
          {/* Dark overlay with blur */}
          <div className="absolute inset-0 bg-black/50 "></div>
        </div>

        {/* Content on top of image */}
        <div className=" relative z-10 pt-50 flex flex-col justify-center items-center text-center px-6 md:px-12 lg:px-24 text-white">
          <h1 className="text-4xl  md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Connect. Inspire. Grow.
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-md">
            Welcome to the <span className="text-yellow-400 font-semibold">CSE Alumni Network</span> — a vibrant, supportive community where past and present students come together to connect, mentor, and thrive.
            Reignite old friendships, discover new opportunities, and stay part of a journey that grows far beyond graduation.
          </p>
          <div className="mt-10">
            {!session && (
              <Link href="/register" className="inline-block">
                <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-semibold px-6 py-3 rounded-lg text-lg transition duration-300 shadow-lg">
                  Join the Network
                </button>
              </Link>
            )}

          </div>
          {/* Floating Image Grid */}
          <div className="flex  justify-center  gap-15 mt-20 px-4">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className={`  w-60 h-70 bg-white rounded-lg overflow-hidden shadow-lg animate-float${index + 1}`}
              >
                <img
                  src={`/images/alumni${index + 1}.JPG`} // Example: /public/images/alumni1.jpg
                  alt={`Alumni ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>


        </div>


      </section>
      </div>


      <div className="w-350 mx-auto py-12 px-6">


        <div className="space-y-6 text-gray-800 ">
          <h2 className="font-bold text-4xl sm:text-5xl text-gray-900 mb-6">
            Computer Science & Engineering Department
          </h2>

          <p>
            The Department of Computer Engineering of the Institute is a pioneer in the field of Computer Engineering in Madhya Pradesh and Central India. Established in 1983, it offers both undergraduate and postgraduate programmes, which commenced in 1983 and 1986 respectively. The department is also a recognized center for Ph.D. under QIP.
          </p>

          <p>
            The department envisions itself as a center of education, research, and development to advance knowledge in Computer Science and Engineering to best serve students, industry, and society. Built on the foundation of service, honesty, and quality, it achieves its mission through total commitment from faculty, staff, and students.
          </p>

          <p>
            A dedicated and qualified team of experienced as well as young and enthusiastic faculty members lead the department, keeping pace with rapid advancements in technology. Their research has been recognized nationally and internationally in fields like Artificial Intelligence, Machine Learning, Deep Learning, Computer Networks, Cloud Computing, Big Data, IoT, Web Technologies, and more.
          </p>

          <p>
            The department features several well-equipped laboratories including the General Computing Lab, Computer Network & Distributed Computing Lab, Software Engineering Lab, Hardware and Peripherals Lab, Data Science Lab, IoT Lab, Cluster Computing Lab, and Project & Research Lab. Open-source technologies are actively promoted, and all labs are internet-enabled via wired and wireless connectivity.
          </p>

          <p>
            The department has played a pivotal role in establishing the Institute’s Campus-wide Network. It emphasizes industry collaboration, ensuring relevance and innovation. It regularly engages in training programs, joint research, and student-industry projects with leading organizations.
          </p>

          <p>
            The placement record for UG and PG students has been consistently impressive. Top recruiters include Google, Amazon, Microsoft, Goldman Sachs, Accenture, and Deloitte, offering high annual packages. Many students also pursue higher studies in reputed national and international institutions.
          </p>

          <p>
            The department collaborated with IIT Bombay nearly two decades ago to launch the Distance Education Programme. It was selected by the Government of India for the IMPACT project, funded by the SWISS Development Corporation, World Bank, and Ministry of IT. It has also been part of TEQIP phases I, II, and III.
          </p>

          <p>
            With a vast alumni base, many graduates now hold prestigious positions in leading organizations and industries worldwide.
          </p>
        </div>
      </div>


    </>
  );
}
