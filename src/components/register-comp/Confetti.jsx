const Confetti = () => {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <defs>
        {/*Smaller Rhomboid Shape */}
        <polygon id="rhomboid" points="0,-0.3 0.3,0 0,0.3 -0.3,0" />
      </defs>

      <g transform="translate(50 50)">
        {/*CONFETTI PARTICLES (copy-paste for more) */}
        {/*Each has a slightly arched path */}

        {/*Straight Up */}
        <use href="#rhomboid" fill="#B384F5">
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to="0 -35"
            dur="1s"
            begin="0s"
            fill="freeze"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1s"
            begin="0s"
            fill="freeze"
          />
        </use>

        {/*Straight Down */}
        <use href="#rhomboid" fill="#4FCFFF">
          <animateTransform
            attributeName="transform"
            type="translate"
            from="0 0"
            to="0 40"
            dur="1s"
            begin="0s"
            fill="freeze"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1s"
            begin="0s"
            fill="freeze"
          />
        </use>

        {/*Arc Top Left */}
        <use href="#rhomboid" fill="#67FFCC">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; -20 -10; -30 10"
            dur="1s"
            begin="0s"
            fill="freeze"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1s"
            begin="0s"
            fill="freeze"
          />
        </use>

        {/*Arc Top Right */}
        <use href="#rhomboid" fill="#7024DB">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 20 -10; 30 10"
            dur="1s"
            begin="0s"
            fill="freeze"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1s"
            begin="0s"
            fill="freeze"
          />
        </use>

        {/*Arc Left */}
        <use href="#rhomboid" fill="#FFFFFF">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; -25 5; -30 20"
            dur="1s"
            begin="0s"
            fill="freeze"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1s"
            begin="0s"
            fill="freeze"
          />
        </use>

        {/*Arc Right */}
        <use href="#rhomboid" fill="#3BC7FC">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 25 5; 30 20"
            dur="1s"
            begin="0s"
            fill="freeze"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1s"
            begin="0s"
            fill="freeze"
          />
        </use>

        {/*More Confetti (Random Directions) */}
        <use href="#rhomboid" fill="#B384F5">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 10 -10; 15 5"
            dur="1s"
            begin="0.1s"
            fill="freeze"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1s"
            begin="0.1s"
            fill="freeze"
          />
        </use>

        <use href="#rhomboid" fill="#67FFCC">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; -10 -15; -20 -5"
            dur="1s"
            begin="0.1s"
            fill="freeze"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1s"
            begin="0.1s"
            fill="freeze"
          />
        </use>

        <use href="#rhomboid" fill="#7024DB">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; -5 5; -10 25"
            dur="1s"
            begin="0.15s"
            fill="freeze"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1s"
            begin="0.15s"
            fill="freeze"
          />
        </use>

        <use href="#rhomboid" fill="#FFFFFF">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 5 5; 10 25"
            dur="1s"
            begin="0.15s"
            fill="freeze"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1s"
            begin="0.15s"
            fill="freeze"
          />
        </use>

        <use href="#rhomboid" fill="#3BC7FC">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 0 -10; 5 10"
            dur="1s"
            begin="0.2s"
            fill="freeze"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1s"
            begin="0.2s"
            fill="freeze"
          />
        </use>

        <use href="#rhomboid" fill="#B384F5">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 15 -20; 30 10"
            dur="1s"
            begin="0s"
            fill="freeze"
          />
          <animate
            attributeName="opacity"
            from="1"
            to="0"
            dur="1s"
            begin="0s"
            fill="freeze"
          />
        </use>

        {/*Add more for density */}
        {/*You can easily duplicate and randomize further */}
      </g>
    </svg>
  );
};

export default Confetti;
