import React, { useEffect, useState } from 'react';

let listeners: React.Dispatch<React.SetStateAction<boolean>>[] = [];
let popupState = false;

export const usePopup = () => {
  const [popupVisible, setPopupVisible] = useState(popupState);

  useEffect(() => {
    // mount 시 등록
    listeners.push(setPopupVisible);
    return () => {
      // unmount 시 해제
      listeners = listeners.filter((l) => l !== setPopupVisible);
    };
  }, []);

  const showPopup = () => {
    popupState = true;
    listeners.forEach((l) => l(true));
  };

  const hidePopup = () => {
    popupState = false;
    listeners.forEach((l) => l(false));
  };

  return { popupVisible, showPopup, hidePopup };
};
