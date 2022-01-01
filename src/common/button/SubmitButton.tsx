import React from 'react';
import './SubmitButton.css';

interface Props {
  title: string;
}

const SubmitButton = (props: Props) => {
  const title = props.title;

  return (
    <div>
      <button type="submit" className="submitButton">
        {title}
      </button>
    </div>
  );
};

export default SubmitButton;
