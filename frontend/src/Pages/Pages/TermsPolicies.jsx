import React, { useState } from 'react';

// The Terms, Privacy Policy, and License Agreement text content
const termsContent = `
  ## Terms and Conditions for Shoop Mart

  **Effective Date:** [Insert Date]

  Welcome to Shoop Mart! By accessing or using our website, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully.

  ### 1. General Terms
  - These Terms and Conditions apply to all users, visitors, and customers of Shoop Mart (referred to as "Shoop Mart," "we," "our," or "us").
  - By using our website, you agree to comply with all applicable laws, including the laws of your jurisdiction.

  ### 2. User Account
  - To make purchases on Shoop Mart, you may need to create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.
  - Users must be at least 18 years old or have parental consent to use our services.

  ### 3. Product Information
  - We strive to provide accurate and up-to-date product information. However, Shoop Mart does not guarantee the accuracy, completeness, or timeliness of the information.
  - Product availability, prices, and promotions may change without notice.

  ### 4. Order Acceptance and Cancellations
  - Shoop Mart reserves the right to accept or reject any order. An order is not considered confirmed until a confirmation email is sent.
  - We may cancel an order if the product is unavailable or there are pricing errors.

  ### 5. Shipping and Delivery
  - Shipping costs are calculated at checkout based on the delivery address and shipping method.
  - We aim to process and ship orders promptly, but we are not responsible for delays caused by third-party carriers or other unforeseen events.

  ### 6. Payment
  - We accept various payment methods, including credit/debit cards and other secure payment options.
  - All payments are processed securely. We do not store your payment information.

  ### 7. Returns and Refunds
  - Shoop Mart has a return and refund policy, which is available on our website. Please refer to the "Returns and Refunds" section for more details on how to return products and get refunds.

  ### 8. Intellectual Property
  - All content on Shoop Mart, including text, images, logos, graphics, and trademarks, is the property of Shoop Mart and is protected by intellectual property laws.

  ### 9. Limitation of Liability
  - Shoop Mart is not liable for any direct, indirect, incidental, or consequential damages arising from the use of our website, products, or services.

  ### 10. Modifications
  - Shoop Mart reserves the right to modify these Terms and Conditions at any time. Changes will be posted on the website, and the revised version will take effect immediately.

  ### 11. Governing Law
  - These Terms and Conditions are governed by the laws of [Insert Jurisdiction]. Any disputes will be resolved in the courts of [Insert Location].
`;

const privacyContent = `
  ## Privacy Policy for Shoop Mart

  **Effective Date:** [Insert Date]

  Your privacy is important to us. This Privacy Policy outlines how Shoop Mart collects, uses, and protects your personal information.

  ### 1. Information We Collect
  - **Personal Information:** When you make a purchase or create an account, we collect personal information such as your name, email address, shipping address, payment information, and contact details.
  - **Non-Personal Information:** We collect non-personal information such as browsing behavior, IP address, and device information to improve our website and services.

  ### 2. How We Use Your Information
  - To process and fulfill your orders.
  - To send you order updates, promotional offers, and other communications related to Shoop Mart.
  - To improve the website and provide a better user experience.

  ### 3. Cookies
  - Shoop Mart uses cookies to enhance the user experience. Cookies are small files stored on your device that help us analyze site traffic and personalize content.

  ### 4. Data Security
  - We implement security measures to protect your personal information from unauthorized access, alteration, or disclosure.
  - However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee its absolute security.

  ### 5. Third-Party Services
  - We may use third-party services such as payment processors and delivery services. These third parties may collect and use your personal information in accordance with their privacy policies.

  ### 6. Sharing Your Information
  - Shoop Mart will not sell, rent, or share your personal information with third parties except as necessary to provide our services (such as payment processors and shipping carriers).

  ### 7. Your Rights
  - You have the right to access, update, and delete your personal information. To do so, please contact our customer support team.
  - You can opt-out of marketing emails by clicking the "unsubscribe" link at the bottom of our emails.

  ### 8. Children’s Privacy
  - Shoop Mart does not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us to have it deleted.

  ### 9. Changes to this Privacy Policy
  - Shoop Mart reserves the right to update this Privacy Policy. Any changes will be posted on this page with an updated effective date.
`;

const licenseContent = `
  ## License Agreement for Shoop Mart

  **Effective Date:** [Insert Date]

  By using our website or purchasing products from Shoop Mart, you agree to the following terms related to the use of the content and products on our website.

  ### 1. Intellectual Property Rights
  - All content, including but not limited to text, graphics, logos, images, and software on Shoop Mart, is the property of Shoop Mart or its content suppliers and is protected by intellectual property laws.
  - You are granted a non-exclusive, non-transferable license to use the content and products on Shoop Mart for personal and non-commercial purposes.

  ### 2. Usage Restrictions
  - You may not modify, reproduce, distribute, or exploit any content from Shoop Mart without our express permission.
  - You may not use our content in any unlawful manner or for any unlawful purpose.

  ### 3. Product License
  - When you purchase a product from Shoop Mart, you are granted a license to use that product in accordance with the product's intended use. This license does not transfer ownership of the product to you.

  ### 4. Termination of License
  - Shoop Mart reserves the right to terminate your license to use our website or products at any time if you violate these terms.

  ### 5. Indemnification
  - You agree to indemnify and hold Shoop Mart harmless from any claims, damages, losses, or expenses arising from your use of our website or products in violation of this License Agreement.
`;

const TermsPolicies = () => {
    const [selectedTab, setSelectedTab] = useState('terms');

    return (
        <div className="max-w-4xl mx-auto p-5">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Shoop Mart - Terms, Privacy, and License</h1>

            <div className="flex justify-center space-x-4 mb-6">
                <button
                    onClick={() => setSelectedTab('terms')}
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                >
                    Terms and Conditions
                </button>
                <button
                    onClick={() => setSelectedTab('privacy')}
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                >
                    Privacy Policy
                </button>
                <button
                    onClick={() => setSelectedTab('license')}
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                >
                    License Agreement
                </button>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-lg whitespace-pre-wrap text-gray-800">
                {selectedTab === 'terms' && termsContent}
                {selectedTab === 'privacy' && privacyContent}
                {selectedTab === 'license' && licenseContent}
            </div>
        </div>
    );
};

export default TermsPolicies;
