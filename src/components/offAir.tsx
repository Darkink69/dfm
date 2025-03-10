import { observer } from "mobx-react-lite";
// import { useEffect, useState } from "react";
// import store from "./store";

const OffAir = observer(() => {
  return (
    <>
      <div>
        <svg width="44" height="25" viewBox="0 0 44 25" fill="none">
          <path
            d="M18 6.01912V17.1411C18 18.7626 19.8282 19.7101 21.153 18.7753L28.7628 13.4061C29.8695 12.6252 29.8963 10.9932 28.8159 10.1765L21.2061 4.4237C19.8886 3.42771 18 4.36751 18 6.01912Z"
            fill="#FCFCFC"
          />
          <path
            d="M32 4V5.66036C34.5347 6.73057 36.3347 9.38627 36.3347 12.5C36.3347 15.6137 34.5347 18.2694 32 19.3396V21C35.4571 19.9694 38 16.5606 38 12.5C38 8.43938 35.4571 5.03057 32 4Z"
            fill="#868686"
          />
          <path
            d="M36 0V2.44171C39.3796 4.01554 41.7796 7.92098 41.7796 12.5C41.7796 17.079 39.3796 20.9845 36 22.5583V25C40.6095 23.4845 44 18.4715 44 12.5C44 6.5285 40.6095 1.51554 36 0Z"
            fill="#868686"
          />
          <path
            d="M12 21L12 19.3396C9.46531 18.2694 7.66531 15.6137 7.66531 12.5C7.66531 9.38627 9.46531 6.73057 12 5.66036L12 4C8.54286 5.03057 6 8.43938 6 12.5C6 16.5606 8.54286 19.9694 12 21Z"
            fill="#868686"
          />
          <path
            d="M8 25L8 22.5583C4.62041 20.9845 2.22041 17.079 2.22041 12.5C2.22041 7.92098 4.62041 4.01554 8 2.44171L8 0C3.39047 1.51555 -1.61483e-06 6.5285 -1.09278e-06 12.5C-5.70739e-07 18.4715 3.39048 23.4845 8 25Z"
            fill="#868686"
          />
        </svg>
      </div>
    </>
  );
});

export default OffAir;
