import { Share2, Check } from "lucide-react";
import { useState } from "react";

const Share = () => {
  const [clicked, setClicked] = useState(false);

  const transition = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
  };

  return (
    <>
      {clicked ? (
        <Check
          size={48}
          className="cursor-pointer rounded border border-transparent p-2"
          color="#18181b"
        />
      ) : (
        <Share2
          onClick={transition}
          size={48}
          className="cursor-pointer  rounded border border-transparent hover:border-zinc-300 p-2"
          color="#18181b"
        />
      )}
    </>
  );
};

export default Share;
