import { useState } from "react";
import { MAX_CHARACTERS } from "../../lib/contants";

type FeedbackFormProps = {
  onAddToList: (text: string) => void;
};

export default function FeedbackForm({ onAddToList }: FeedbackFormProps) {
  const [formText, setFormText] = useState("");
  const charCount = MAX_CHARACTERS - formText.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length > MAX_CHARACTERS) return;
    setFormText(newText);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddToList(formText);
    setFormText("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <textarea
        value={formText}
        onChange={handleChange}
        id="feedback-textarea"
        placeholder=""
        spellCheck={false}
      />

      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>

      <div>
        <p className="u-italic">{charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
