import React, { useState, useEffect, useRef } from 'react';

const SmartOtp = ({
  otpLength = 6,
  autoFocus = true,
  width = 40,
  height = 50,
  borderRadius = 8,
  backgroundColor = 'white',
  textColor = 'black',
  cursorColor = 'blue',
  activeStateBackgroundColor = 'lightblue',
  activeStateBorderColor = 'blue',
  activeStateTextColor = 'orange',
  style = {},
  isDigit = true,
  onChange
}) => {
  const [otpCodes, setOtpCodes] = useState(Array(otpLength).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (value, index) => {
    const newOtpCodes = [...otpCodes];
    if (value.length > 1) {
      value = value.substring(0, Math.min(value.length, otpLength - index));
      for (let i = 0; i < value.length; i++) {
        newOtpCodes[index + i] = value[i];
      }
    } else {
      newOtpCodes[index] = value;
    }

    setOtpCodes(newOtpCodes);
    onChange && onChange(newOtpCodes.join(''));

    if (value.length === 1 && index < otpLength - 1) {
      inputRefs.current[index + 1].focus();
    } else if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {Array(otpLength).fill(0).map((_, index) => (
        <div
          key={index}
          style={{
            width: width,
            height: height,
            margin: '0 5px',
            backgroundColor: otpCodes[index] ? activeStateBackgroundColor : backgroundColor,
            border: `1px solid ${otpCodes[index] ? activeStateBorderColor : 'transparent'}`,
            borderRadius: borderRadius,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <input
            ref={el => inputRefs.current[index] = el}
            type={isDigit ? 'tel' : 'text'}
            value={otpCodes[index]}
            onChange={e => handleChange(e.target.value, index)}
            style={{
              width: '100%',
              height: '100%',
              textAlign: 'center',
              border: 'none',
              backgroundColor: 'transparent',
              color: otpCodes[index] ? activeStateTextColor : textColor,
              fontSize: '18px',
              fontWeight: 'bold',
              ...style,
            }}
            maxLength={1}
            inputMode={isDigit ? 'numeric' : 'text'}
          />
        </div>
      ))}
    </div>
  );
};

export default SmartOtp;
