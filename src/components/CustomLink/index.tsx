import { Link } from "react-router-dom";

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
}
export const CustomLink = (props: CustomLinkProps) => {
  return (
    <Link
      style={{
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
      }}
      to={props.to}
    >
      {props.children}
    </Link>
  );
};
