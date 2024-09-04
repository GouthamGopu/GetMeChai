import React from 'react';

const SupportPage = () => {
  return (
    <div className="text-white min-h-screen relative">
      <div className="Toastify"></div>
      <div className="bg-cover relative w-full">
        <div
          role="status"
          className="flex items-center justify-center h-40 md:h-[21rem] w-full bg-gray-300 animate-pulse dark:bg-gray-700"
        >
          <svg
            className="w-20 h-20 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"></path>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
        <div className="size-20 md:size-32 object-center absolute mx-auto right-0 left-0 -bottom-12 md:-bottom-16 border-2 overflow-hidden border-white rounded-full bg-black">
          <img
            className="object-cover size-20 md:size-32"
            src="./avatar.gif"
            alt="avatarImage"
          />
        </div>
      </div>
      <div className="info flex items-center justify-center py-20 flex-col gap-2">
        <div className="font-bold text-lg">@gopugoutham3</div>
        <div className="text-slate-300">
          let's Help gopugoutham3 to get a cup of tea
        </div>
        <div className="text-slate-400">0 supporters . ₹0 raised</div>
        <div className="payment flex flex-col-reverse md:flex-row gap-3 container mt-12 px-5 md:px-0">
          <div className="supporters w-full bg-slate-800/40 rounded-lg backdrop-blur-sm h-[28rem] p-5 md:p-10 overflow-auto">
            <h2 className="text-xl font-bold mb-5">Supporters</h2>
            <div className="text-center font-extrabold text-lg">
              No supporters yet ☹
            </div>
            <ul className="mx-2.5 md:mx-5 text-md"></ul>
          </div>
          <div className="makePayment w-full bg-slate-800/40 rounded-lg backdrop-blur-sm p-10">
            <h2 className="text-xl font-bold mb-5">Make a payment</h2>
            <form
              action="javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
              className="flex flex-col gap-3"
            >
              <input
                placeholder="Name"
                className="p-2 rounded-md bg-slate-800/40"
                required
                type="text"
                value=""
                name="name"
              />
              <input
                placeholder="Message"
                className="p-2 rounded-md bg-slate-800/40"
                required
                type="text"
                value=""
                name="message"
              />
              <input
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Amount"
                className="p-2 rounded-md bg-slate-800/40"
                type="number"
                value=""
                name="amount"
              />
              <button
                type="button"
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-md dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 disabled:from-gray-500 disabled:cursor-not-allowed disabled:shadow-gray-800/80 disabled:hover:bg-gradient-to-r"
                disabled
              >
                Support
              </button>
            </form>
            <div className="flex gap-3 mt-5">
              <button className="p-2 bg-slate-600/40 rounded-md hover:bg-slate-700/90 disabled:cursor-not-allowed disabled:bg-slate-800/40" disabled>
                Pay ₹10
              </button>
              <button className="p-2 bg-slate-600/40 rounded-md hover:bg-slate-700/90 disabled:cursor-not-allowed disabled:bg-slate-800/40" disabled>
                Pay ₹20
              </button>
              <button className="p-2 bg-slate-600/40 rounded-md hover:bg-slate-700/90 disabled:cursor-not-allowed disabled:bg-slate-800/40" disabled>
                Pay ₹50
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
