import styled from "styled-components";
import { Button } from "../Buttons";
import { CustomLink } from "../CustomLink";
import { H1, H5 } from "../Headings";
import { Image } from "../Image";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  gap: 0.4rem;
`;

const MiddleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #fcd5db;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColorDark};
  font-size: 3rem;
  font-weight: bold;
`;

interface ProfileCardProps {
  avatar?: string;
  username?: string | undefined;
  followers?: number;
  following?: number;
  bio?: string;
  type: "user" | "creator";
}

export const ProfileCard = (props: ProfileCardProps) => {
  return (
    <MainContainer>
      {props.avatar && (
        <Image type="circle" width="150px" height="150px" src={props.avatar} />
      )}
      {!props.avatar && (
        <Avatar>{props.username ? props.username[1].toUpperCase() : ""}</Avatar>
      )}
      <H1
        size="30px"
        sizeMobile="24px"
        weight="bold"
        align="center"
        alignMobile="center"
      >
        {props.username}
      </H1>
      <MiddleContainer>
        <CustomLink to={props.type === "user" ? "/home/followers" : ""}>
          <H5 weight="bold" color="light">
            Followers {props.followers}
          </H5>
        </CustomLink>
        <CustomLink to={props.type === "user" ? "/home/followings" : ""}>
          <H5 weight="bold" color="light">
            Following {props.following}
          </H5>
        </CustomLink>
      </MiddleContainer>
      <H5 weight="bold" color="dark" align="center" alignMobile="center">
        {props.bio}
      </H5>
      <MiddleContainer>
        {props.type === "user" && (
          <CustomLink to="/home/settings">
            <Button variants="tertiary">Edit Profile</Button>
          </CustomLink>
        )}
      </MiddleContainer>
    </MainContainer>
  );
};
