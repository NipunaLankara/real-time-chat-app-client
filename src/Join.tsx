import {useState} from "react";

type Props = {
    onJoin: (username: string) => void;
};

const Join = ({onJoin}: Props) => {
    const [name, setName] = useState("");

    const handleJoin = () => {
        if (name.trim()) onJoin(name);
    };

    return (
        <div className="login-box">
            <div style={{padding: 20}}>
                <h2>Enter your name</h2>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                />
                <button onClick={handleJoin}>Join</button>
            </div>
        </div>
    );
};

export default Join;
