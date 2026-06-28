export default function CustomSvg({ name, color, width, height }) {
  return  name === "plus" ? (
    <svg
      width="22"
      height="23"
      viewBox="0 0 22 23"
      fill="black"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.4286 13.4381H12.5714V21.2953C12.5714 22.1596 11.8643 22.8667 11 22.8667C10.1357 22.8667 9.42857 22.1596 9.42857 21.2953V13.4381H1.57143C0.707143 13.4381 0 12.731 0 11.8667C0 11.0024 0.707143 10.2953 1.57143 10.2953H9.42857V2.43813C9.42857 1.57384 10.1357 0.866699 11 0.866699C11.8643 0.866699 12.5714 1.57384 12.5714 2.43813V10.2953H20.4286C21.2929 10.2953 22 11.0024 22 11.8667C22 12.731 21.2929 13.4381 20.4286 13.4381Z"
        fill="#000"
      />
    </svg>
  ) : name === "minus" ? (
    <svg
      width="26"
      height="5"
      viewBox="0 0 26 5"
      fill="black"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        id="Vector"
        d="M2 2.3667H24"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <></>
  );
}
