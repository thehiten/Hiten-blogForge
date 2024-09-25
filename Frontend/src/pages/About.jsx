import React from "react";

function About() {
  return (
    <div className="max-w-4xl mx-auto p-8 ">
      <h1 className="text-3xl font-bold mb-6">About</h1>
      <p className="text-lg text-blue-500 mb-6">
        As a <span className="font-semibold text-blue-700">Computer Science student</span> at 
        <span className="font-semibold text-blue-700"> Chandigarh University</span>, I've built a strong foundation in 
        both theoretical and practical aspects of the field. Here are some of my key areas of knowledge:
      </p>

      <h1 className="text-2xl font-semibold mb-4">My Knowledge of the MERN Stack:</h1>

      <ul className="text-left text-gray-700 list-disc list-inside">
        <li className="mb-4">
          <span className="font-bold text-lg text-blue-600">MongoDB:</span> 
          A <span className="text-blue-700">NoSQL database</span> offering flexibility in handling unstructured data. 
          I've worked on:
          <ul className="list-disc list-inside ml-6">
            <li>Designing efficient database schemas</li>
            <li>Managing collections and performing CRUD operations</li>
            <li>Using Mongoose for object modeling</li>
          </ul>
        </li>

        <li className="mb-4">
          <span className="font-bold text-lg text-blue-600">Express.js:</span> 
          A fast and minimalist web framework for <span className="text-blue-700">Node.js</span>. My experience includes:
          <ul className="list-disc list-inside ml-6">
            <li>Building RESTful APIs</li>
            <li>Managing server-side logic and routing</li>
            <li>Handling middleware and authentication</li>
          </ul>
        </li>

        <li className="mb-4">
          <span className="font-bold text-lg text-blue-600">React.js:</span> 
          A powerful front-end JavaScript library for building user interfaces. My experience covers:
          <ul className="list-disc list-inside ml-6">
            <li>Creating dynamic, component-based interfaces</li>
            <li>Using React hooks for state management</li>
            <li>Building responsive and scalable applications</li>
          </ul>
        </li>

        <li className="mb-4">
          <span className="font-bold text-lg text-blue-600">Node.js:</span> 
          An efficient platform for writing server-side JavaScript. I've used it for:
          <ul className="list-disc list-inside ml-6">
            <li>Implementing asynchronous programming</li>
            <li>Handling concurrent requests for high-performance applications</li>
            <li>Creating scalable backend systems</li>
          </ul>
        </li>
      </ul>

      <h1 className="text-2xl font-semibold mb-4">Projects and Practical Experience:</h1>
      <p className="text-left text-gray-700">
        Through both <span className="font-semibold text-blue-600">coursework and personal projects</span>, I've applied my MERN stack knowledge to:
      </p>
      <ul className="text-left text-gray-700 list-disc list-inside mt-4">
        <li>Develop a range of web applications</li>
        <li>Collaborate with others to solve real-world problems</li>
        <li>Manage the full lifecycle of applications, from development to deployment</li>
      </ul>
    </div>
  );
}

export default About;
