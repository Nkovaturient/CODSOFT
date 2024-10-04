import React from 'react';
import {
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';

const QuizShare = ({ quizResult }) => {
  const currentUrl = window.location.href;
  const shareMessage = `I just completed the quiz and scored ${quizResult}! Try it yourself on QuizBolt!`;

  return (
    <div className="flex flex-col items-center space-y-4 mt-8">
      <h2 className="text-2xl font-semibold mb-4">Share Your Results</h2>
      <p className="text-lg mb-4">Let your friends know how you did:</p>

      <div className="flex space-x-4 " >
        
        <TwitterShareButton url={currentUrl} className=' hover:scale-125' title={shareMessage}>
          <TwitterIcon size={48} round />
        </TwitterShareButton>

       
        <FacebookShareButton url={currentUrl} className=' hover:scale-125' quote={shareMessage}>
          <FacebookIcon size={48} round />
        </FacebookShareButton>

        
        <LinkedinShareButton url={currentUrl} className=' hover:scale-125' title="QuizBolt Results" summary={shareMessage}>
          <LinkedinIcon size={48} round />
        </LinkedinShareButton>

        <WhatsappShareButton url={currentUrl} className=' hover:scale-125' title="QuizBolt Results" summary={shareMessage}>
          <WhatsappIcon size={48} round />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default QuizShare;
