type Props = {
  color?: string;
};
function RemoveIcon(props: Props) {
  const { color = "#A23434" } = props;
  return (
    <svg
      width="13"
      height="17"
      viewBox="0 0 13 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.928571 15.1111C0.928571 16.15 1.76429 17 2.78571 17H10.2143C11.2357 17 12.0714 16.15 12.0714 15.1111V3.77778H0.928571V15.1111ZM3.21286 8.38667L4.52214 7.055L6.5 9.05722L8.46857 7.055L9.77786 8.38667L7.80929 10.3889L9.77786 12.3911L8.46857 13.7228L6.5 11.7206L4.53143 13.7228L3.22214 12.3911L5.19071 10.3889L3.21286 8.38667ZM9.75 0.944444L8.82143 0H4.17857L3.25 0.944444H0V2.83333H13V0.944444H9.75Z"
        fill={color}
      />
    </svg>
  );
}

export default RemoveIcon;
