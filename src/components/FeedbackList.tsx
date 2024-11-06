import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

export default function FeedbackList() {
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );

      if (!response.ok) {
        setErrorMessage("Error fetching data");
        return;
      }

      const data = await response.json();
      setFeedbackItems(data.feedbacks);
    };

    fetchFeedbackItems();
    setIsLoading(false);

    // Historical code to use fetch

    // setIsLoading(true);
    // fetch(
    //   "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
    // )
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error();
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     setFeedbackItems(data.feedbacks);
    //     setIsLoading(false);
    //   })
    //   .catch(() => {
    //     // network error, not 2xx reponse, or JSON parsing error
    //     setIsLoading(false);
    //     setErrorMessage("Error fetching data");
    //   });
  }, []);

  return (
    <ol className="feedback-list">
      {isloading ? <Spinner /> : null}

      {errorMessage ? <ErrorMessage message={errorMessage} /> : null}

      {feedbackItems.map(feedbackItem => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
