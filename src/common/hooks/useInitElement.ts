import { useEffect, useState } from "react";

const useInitElement = (): [string, () => void] => {
  const [n, setN] = useState(0);
  const [id, setId] = useState(`dndnode_${n}`);

  useEffect(() => {
    n && setId(`dndnode_${n}`);
  }, [n]);

  const nextId = () => {
    setN((state) => ++state);
  };

  return [id, nextId];
};

export default useInitElement;
