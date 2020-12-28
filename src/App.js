import * as React from "react";
import { UserForm } from "./components/UserForm";
import { UserFalback } from './components/UserFallback';
import { UserView } from "./components/UserView";
import { fetchGithubUser } from './userService';

const UserInfo = ({ userName }) => {

  const [state, setState] = React.useState({
    status: userName ? "pending" : "idle",
    user: null,
    error: null
  });

  const { status, user, error } = state;

  React.useEffect(() => {
    if (!userName) return;

    setState({ status: "pending" });

    fetchGithubUser(userName).then(
      (userData) => {
        setState({ status: "resolved", user: userData });
      },
      (error) => {
        setState({ status: "rejected", error });
      }
    );
  }, [userName])

  switch (status) {
    case "pendding":
      return <UserFalback userName={userName} />;

    case "resolved":
      return <UserView user={user} />;

    case "rejected":
      return <div>
        There was an error
        <pre style={{ whiteSpace: "normal" }}>{error}</pre>
      </div>

    default:
      return "submit user"
  }

};

const UserSection = ({ onSelect, userName }) => (
  <div>
    <div className="flex justify-center ">
      <UserInfo userName={userName} />
    </div>
  </div>
);

const App = () => {
  const [userName, setUserName] = React.useState(null);
  const handleSubmit = (newUserName) => setUserName(newUserName);
  const handleSelect = (newUserName) => setUserName(newUserName);

  return (
    <div>
      <UserForm userName={userName} onSubmit={handleSubmit} />
      <hr />
      <div className="m-4">
        <UserSection onSelect={handleSelect} userName={userName} />
      </div>
    </div>
  );
};

export default App;
