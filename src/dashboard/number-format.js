import React from 'react';

function NumberFormatter({ number, separator = ',' }) {
  if (isNaN(number)) {
    return <span>NaN</span>;
  }

  const parts = number.toString().split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] ? `.${parts[1]}` : '';

  const regex = /\B(?=(\d{3})+(?!\d))/g;
  const formattedIntegerPart = integerPart.replace(regex, separator);

  return <span>{formattedIntegerPart + decimalPart}</span>;
}

export default NumberFormatter;
