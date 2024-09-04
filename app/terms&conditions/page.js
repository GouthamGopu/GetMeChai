import React from 'react'

const TermsConditions = () => {
  return (
    <>
  <div className="py-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Terms & Conditions</h1>
      <p className="text-gray-300 mb-6">
        <strong>Effective Date:</strong> 2024
      </p>
      <p className="text-gray-300 mb-6">
        Welcome to Get Me A Chai. By using our website, you agree to comply with and be bound by the following terms and conditions:
      </p>
      <h2 className="text-xl font-bold mb-4">User Responsibilities:</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Provide accurate and complete information during registration.</li>
        <li>Use the platform in accordance with all applicable laws and regulations.</li>
      </ul>
      <h2 className="text-xl font-bold mb-4">Prohibited Activities:</h2>
      <ul className="list-disc pl-6 mb-6">
        <li>Fraudulent activities or impersonation.</li>
        <li>Posting harmful or illegal content.</li>
      </ul>
      <p className="text-gray-300 mb-6">
        <strong>Intellectual Property:</strong> All content on this site is the property of Get Me A Chai or its content suppliers and protected by intellectual property laws.
      </p>
      <p className="text-gray-300 mb-6">
        <strong>Disclaimer:</strong> We do not guarantee the success of any crowdfunding campaign. Contributions are made at your own risk.
      </p>
      <p className="text-gray-300 mb-6">
        <strong>Changes to Terms:</strong> We may update these terms from time to time. Continued use of the site constitutes acceptance of the revised terms.
      </p>
      <p className="text-gray-300">
        For more details, please read our full <a href="#" className="text-blue-500 hover:underline">Terms & Conditions</a>.
      </p>
      
    </div>
  </div>
</>

  )
}

export default TermsConditions

export const metadata = {
  title: 'Terms & Conditions - Get Me Chai',
}