import { useState } from "react";
import Join from "./Join";
import Chat from "./Chat";

const App = () => {
    const [username, setUsername] = useState("");

    return username ? (
        <Chat username={username} />
    ) : (
        <Join onJoin={setUsername} />
    );
};

export default App;
