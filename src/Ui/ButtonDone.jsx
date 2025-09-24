// ButtonDone.jsx
import React, { useEffect, useState } from "react";

const ButtonDone = ({ checkLoading, handleSave, edit }) => {
  const fullText = "Loading...";
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timer;

    if (checkLoading) {
      timer = setTimeout(() => {
        if (!isDeleting) {
          setDisplayText(fullText.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);

          if (charIndex + 1 === fullText.length) {
            setIsDeleting(true);
          }
        } else {
          // مسح
          setDisplayText(fullText.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);

          if (charIndex - 1 === 0) {
            setIsDeleting(false);
          }
        }
      }, 100);
    } else {
      setDisplayText("");
      setCharIndex(0);
      setIsDeleting(false);
    }

    return () => clearTimeout(timer);
  }, [checkLoading, charIndex, isDeleting]);

  return (
    <div className="flex mt-6">
      <button
        disabled={checkLoading}
        className={`transition-transform duration-1000
          w-[300px] text-[32px] font-medium h-[72px] rounded-[16px] hover:scale-90 ${
            checkLoading
              ? "bg-white text-one border-2 border-one"
              : "bg-one text-white"
          }`}
        onClick={handleSave}
      >
        {checkLoading ? displayText : <span>{edit ? "Edit" : "Add"}</span>}
      </button>
    </div>
  );
};

export default ButtonDone;
