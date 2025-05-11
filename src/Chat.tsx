import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface Message {
    username: string;
    text: string;
    timestamp: string;
}

const socket = io("http://localhost:4000");

const Chat = ({ username }: { username: string }) => {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        socket.emit("joinRoom", { username });

        socket.on("chat", (msg: Message) => {
            setMessages((prev) => [...prev, msg]);

            // Check if the browser supports notifications
            if (Notification.permission === "granted" && msg.username !== username) {
                new Notification(`${msg.username}: ${msg.text}`);
            }
        });

        // Request notification permission if not already granted
        if (Notification.permission !== "granted") {
            Notification.requestPermission();
        }

        return () => {
            socket.removeAllListeners();
        };
    }, [username]);

    const sendMessage = () => {
        if (input.trim()) {
            socket.emit("chat", { username, text: input });
            setInput("");
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                <div className="chat-header">Chatting as: {username}</div>
                <div className="chat-messages">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`msg ${msg.username === username ? "self" : ""}`}>
                            <div className="meta">
                                <b>{msg.username}</b> • {new Date(msg.timestamp).toLocaleTimeString()}
                            </div>
                            <div className="text">{msg.text}</div>
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
