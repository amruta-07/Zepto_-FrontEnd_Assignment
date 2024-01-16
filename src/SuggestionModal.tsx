
import React, { useRef, useEffect, useState, useMemo } from 'react';
import './SuggestionModal.css';
import { User } from './TagInput';

interface SuggestionModalProps {
    users: User[];
    inputValue: string;
    onSelect: (username: string) => void;
}

const SuggestionModal: React.FC<SuggestionModalProps> = ({ users, inputValue, onSelect }) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const inputElement = document.querySelector('.tag-input') as HTMLElement;
        const inputRect = inputElement.getBoundingClientRect();
        const modalHeight = modalRef.current?.offsetHeight || 0;

        setPosition({
            top: inputRect.bottom,
            left: inputRect.left,
        });

        if (inputRect.bottom + modalHeight > window.innerHeight) {
            setPosition({
                top: inputRect.top - modalHeight,
                left: inputRect.left,
            });
        }
    }, [inputValue]);

    const filteredSuggestions = useMemo(() => {
        let search = inputValue.trim()
        if (!inputValue?.trim()) {
            return users
        }
        console.log(search)
        return users.filter(
            (user) => user.username.toLowerCase().includes(search.toLowerCase())
        );
    }, [inputValue, users])


    return (
        <div
            className="suggestion-modal"
            ref={modalRef}
            style={{
                top: position.top, left: position.left,
                width: 330,
                maxHeight: 750
            }}
        >
            {filteredSuggestions.map((user) => (
                <div key={user.username}
                    style={{
                        background: "#fff",
                        marginLeft: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        padding: "0px 8px 0px 6px",
                        height: 45,
                        display:"flex",
                        borderBottom:"1px solid #fff"

                    }}
                    onClick={() => onSelect(user.username)}>
                    <img src={user.image} alt={user.username} className="user-image"
                        style={{
                            width: 35,
                            height: 35,
                            borderRadius: 35 / 2
                        }}
                    />
                    <p
                        style={{
                            marginLeft: 3,
                            fontSize: 13
                        }}
                    >{user.username}</p>

                    <p
                    style={{
                        marginLeft: 3,
                        fontSize: 13,
                        color:"#ccc",
                        position:"absolute",
                        right:10
                    }}
                    >{user.email}</p>
                </div>
            ))}
        </div>
    );
};

export default SuggestionModal;
