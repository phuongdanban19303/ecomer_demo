import React from "react";

const DATA_ROW1: string[] = [
  "Help & Contact Us",
  "Returns & Refunds",
  "Online Stores",
  "Terms & Conditions",
];
const DATA_ROW2: string[] = [
  "What We Do",
  "Available Services",
  "Latest Posts",
  "FAQS",
];
const DATA_ROW3: string[] = [
  "Twitter",
  "Instagram",
  "Facebook",
  "Pinterest",
];

const Footer: React.FC = () => {
  const renderFooter = (data: string[]) => {
    return data.map((item, index) => {
      return (
        <p 
          className="text-gray-400 mb-2 cursor-pointer hover:text-white transition-colors" 
          key={index}
        >
          {item}
        </p>
      );
    });
  };

  return (
    <div className="bg-black py-16 mt-10">
      <div
        style={{ width: "1200px", margin: "0px auto" }}
        className="grid grid-cols-3 gap-8 italic"
      >
        <div>
          <h6 className="text-white text-lg font-semibold tracking-widest mb-4">
            CUSTOMER SERVICES
          </h6>
          {renderFooter(DATA_ROW1)}
        </div>
        <div>
          <h6 className="text-white text-lg font-semibold tracking-widest mb-4">
            COMPANY
          </h6>
          {renderFooter(DATA_ROW2)}
        </div>
        <div>
          <h6 className="text-white text-lg font-semibold tracking-widest mb-4">
            SOCIAL MEDIA
          </h6>
          {renderFooter(DATA_ROW3)}
        </div>
      </div>
    </div>
  );
};

export default Footer;