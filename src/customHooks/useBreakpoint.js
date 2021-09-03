import {useState, useEffect} from 'react';
import throttle from 'lodash.throttle';

const getDeviceConfig = (width) => {
  return width <320 ? "xxs" : width <500 ? "xs" : width <720 ? "sm" : width <1024 ? "md" : width <1600 ? "lg" :"xl"
};

const useBreakpoint = () => {
  const [brkPnt, setBrkPnt] = useState(() => getDeviceConfig(window.innerWidth));
  
  useEffect(() => {
    const calcInnerWidth = throttle(function() {
      setBrkPnt(getDeviceConfig(window.innerWidth))
    }, 200); 
    window.addEventListener('resize', calcInnerWidth);
    return () => window.removeEventListener('resize', calcInnerWidth);
  }, []);

  return brkPnt;
}
export default useBreakpoint;