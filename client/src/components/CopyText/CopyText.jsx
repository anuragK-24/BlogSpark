import React, { useState } from "react";
import "./CopyText.scss";
import copy from "../../image/copy.png";
const CopyText = ({ textToCopy, heading }) => {
  const [showCopied, setShowCopied] = useState(false);

  const handleCopyClick = () => {
    const el = document.createElement("textarea");
    el.value = textToCopy;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 1000);
  };

  return (
    <div className="CopyText" onClick={handleCopyClick}>
      <h2 className="CopyText__Heading">{heading}</h2>
      <div className="CopyText__Content">
        <div className="CopyText__Content__Box">
          <img className="CopyText__Content__Box__Title" src={copy} alt="" />
          {showCopied && (
            <h3 className="CopyText__Content__Box__Copied">Copied !!</h3>
          )}
        </div>
        <hr />
        <div className="CopyText__Code" role="button" tabindex="0">
          {textToCopy}
        </div>
      </div>
    </div>
  );
};

export default CopyText;
