import { Button } from "../../components/Buttons";
import { setToken } from "../../store/features/user-slice";
import { useAppDispatch } from "../../store/hooks";

export const UserProfilePage = () => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <h1>UserProfilePage</h1>
      <Button onClick={() => dispatch(setToken(null))}>Logout</Button>
    </div>
  );
};
