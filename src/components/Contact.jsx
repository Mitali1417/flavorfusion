import React from "react";
import { styles } from "../styles";
import { useState } from "react";

const Contact = () => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });
  let name, value;
  const postData = (e) => {
    name = e.target.name;
    value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, subject, message } = data;
    if (fullName && email && subject && message) {
      const res = await fetch(
        "https://auth-f3932-default-rtdb.firebaseio.com/ContactForm.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            email,
            subject,
            message,
          }),
        }
      );
      if (res) {
        setData({
          fullName,
          email,
          subject,
          message,
        });
        alert("Saved Successfully");
      } else {
        alert("Please fill the data");
      }
    } else {
      alert("Please fill the data");
    }
  };

  return (
    <>
      <div
        className={`relative w-full z-[2] ${styles.flexCenter} -bottom-[6rem]`}
      >
        <h2
          data-aos="zoom-in"
          className={`absolute ${styles.heading2} drop-shadow-2xl`}
        >
          Get in Touch
        </h2>
      </div>
      <div
        className={`w-full h-full rounded-b-[4rem] overflow-hidden shadow-2xl ${styles.marginY} my-[6rem] `}
      >
        <div
          className={`contactbg w-full ${styles.paddingX} ${styles.paddingY} py-[5rem] ${styles.flexCenter} flex-col`}
        >
          <div 
              data-aos="fade-up"
            className={`w-full sm:w-[70%] md:w-[50%] ${styles.paddingX}  ${styles.paddingY} rounded-[1.4rem] backdrop-blur-3xl shadow-2xl`}
          >
            <form action="POST">
              <div
                className={`${styles.flexCenter} flex-col ss:flex-row  w-full`}
              >
                <div
                  className={`flex justify-center flex-col w-full mr-[0.5rem]`}
                >
                  <label htmlFor="" className={`my-[0.3rem]`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    className={`rounded-[0.7rem] h-[2.5rem] text-black text-[0.8rem]`}
                    placeholder="Name"
                    name="fullName"
                    onChange={postData}
                    value={data.fullName}
                  />
                </div>
                <div
                  className={`flex justify-center flex-col w-full mr-[0.5rem]`}
                >
                  <label htmlFor="" className={`my-[0.3rem]`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    className={`rounded-[0.7rem] h-[2.5rem] text-black text-[0.8rem]`}
                    placeholder="Email"
                    name="email"
                    onChange={postData}
                    value={data.email}
                  />
                </div>
              </div>
              <div className={`flex justify-center flex-col w-full`}>
                <label htmlFor="" className={`my-[0.3rem]`}>
                  Subject
                </label>
                <input
                  type="text"
                  className={`rounded-[0.7rem] h-[2.5rem] text-black text-[0.8rem]`}
                  placeholder="Subject"
                  name="subject"
                  onChange={postData}
                  value={data.subject}
                />
              </div>
              <div className={`flex justify-center flex-col w-full`}>
                <label htmlFor="" className={`my-[0.3rem]`}>
                  Message
                </label>
                <textarea
                  rows={4}
                  className={`rounded-[0.7rem] text-black text-[0.8rem]`}
                  placeholder="Message"
                  name="message"
                  onChange={postData}
                  value={data.message}
                />
              </div>
              <div className={`${styles.flexCenter} mt-[1.5rem]`}>
                <button
                  className={`${styles.btn}`}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
