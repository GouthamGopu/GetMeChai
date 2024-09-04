import React from 'react'

const Contact = () => {
  return (
      <>
  <div className="min-h-[72vh]">
    <section id="features" className="relative block px-6 py-10 md:py-10 md:px-10  border-neutral-900 bg-neutral-900/30">
      <div className="mx-[-10px] md:px-10 my-5">
        <div className="flex pt-2 mb-10 justify-center text-4xl font-extrabold font-sans items-center">
          Contact Us
        </div>
        <div className="text-center font-bold text-white">
          We&apos;d love to hear from you!
        </div>
        <p className="p-4 text-gray-200 text-md text-center font-sans">
          If you have any questions, feedback, or need support, feel free to reach out to us:
        </p>
        <p className="p-4 text-gray-200 text-md text-center font-sans flex flex-col">
          <span>Email: gopugoutham3@gmail.com</span>
          <span>Phone: +91-9347364271</span>
          <span>Address: Your Heart❤</span>
        </p>
        <p className="p-4 text-gray-200 text-md text-center font-sans flex flex-col">
          <span>Follow us on social media for the latest updates and news:</span>
          <a href="https://twitter.com/goutham_dimpu" target="_blank" className=""><span>Twitter</span></a>
          <a href="https://www.instagram.com/goutham_dimpu" target="_blank" className=" "><span>Instagram</span></a>
        </p>
      </div>
      
    </section>
  </div>
</>
  )
}

export default Contact

export const metadata = {
  title: 'Contact - Get Me Chai',
}
