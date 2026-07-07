import React from "react";

const About = () => {
  const containerStyle = {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "40px",
    background: "#18181b",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
    textAlign: "center",
  };

  const socialBtnStyle = {
    display: "inline-block",
    margin: "10px",
    padding: "10px 20px",
    background: "#27272a",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    transition: "all 0.3s ease",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  };

  return (
    <div style={containerStyle}>
      <img
        src="/dp.png"
        alt="Devansh"
        style={{
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "4px solid #f97316",
          marginBottom: "20px",
          boxShadow: "0 4px 20px rgba(249, 115, 22, 0.4)",
        }}
      />

      <h2
        style={{
          fontSize: "2.5rem",
          marginBottom: "10px",
          color: "#fff",
        }}
      >
        About Us
      </h2>

      <h3
        style={{
          fontSize: "1.5rem",
          color: "#f97316",
          marginBottom: "15px",
        }}
      >
        OnlineBazaar
      </h3>

      <p
        style={{
          color: "#a1a1aa",
          fontSize: "1.2rem",
          lineHeight: "1.8",
          maxWidth: "700px",
          margin: "0 auto 30px auto",
        }}
      >
        <strong>Your One-Stop Online Shopping Destination!</strong>
        <br />
        <br />
        Welcome to <strong>OnlineBazaar</strong>, a modern e-commerce platform
        developed to provide a seamless, secure, and enjoyable online shopping
        experience. Our mission is to make shopping simple by offering quality
        products across multiple categories with an intuitive interface, fast
        performance, and secure checkout.
        <br />
        <br />
        This project is built using the MERN Stack and includes features like
        user authentication, product management, shopping cart, order tracking,
        secure payments, and responsive design to deliver a complete shopping
        solution.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <a href="#" target="_blank" rel="noreferrer" style={socialBtnStyle}>
          🌐 Live Demo
        </a>

        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background: "rgba(59,130,246,0.2)",
            borderColor: "#3b82f6",
            color: "#3b82f6",
          }}
        >
          💻 GitHub
        </a>

        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background: "rgba(14,165,233,0.2)",
            borderColor: "#0ea5e9",
            color: "#0ea5e9",
          }}
        >
          📧 Contact
        </a>

        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background: "rgba(16,185,129,0.2)",
            borderColor: "#10b981",
            color: "#10b981",
          }}
        >
          📱 LinkedIn
        </a>

        <a
          href="#"
          target="_blank"
          rel="noreferrer"
          style={{
            ...socialBtnStyle,
            background: "rgba(168,85,247,0.2)",
            borderColor: "#a855f7",
            color: "#a855f7",
          }}
        >
          ⭐ Portfolio
        </a>
      </div>
    </div>
  );
};

export default About;
