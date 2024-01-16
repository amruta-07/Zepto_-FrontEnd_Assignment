import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent, useMemo } from 'react';
import './TagInputstyle.css';
import SuggestionModal from './SuggestionModal';
export interface User {
  username: string;
  image: string;
  email:string
}

interface TagInputProps {
  users: User[];
}

const TagInput: React.FC<TagInputProps> = ({ users }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const unSelectedUser = useMemo(() => {
    return users.filter(user => !selectedUsers.some(selectedUser => selectedUser.username === user.username));
  }, [selectedUsers, users]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedUsers]);


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setShowSuggestions(true);

  };

  const handleInputClick = () => {
    setShowSuggestions(true);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      handleAddUser(inputValue.trim());
    } else if (event.key === 'Backspace' && inputValue === '' && selectedUsers.length > 0) {
      handleRemoveUser(selectedUsers[selectedUsers.length - 1]);
    }
  }

  const handleAddUser = (username: string) => {
    const user = users.find((user) => user.username === username);
    if (user) {
      const isExist = selectedUsers.find((user) => user.username === username);
      if(!isExist){
        setSelectedUsers([...selectedUsers, user]);

      }
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const handleRemoveUser = (user: User) => {
    const updatedUsers = selectedUsers.filter((selectedUser) => selectedUser !== user);
    setSelectedUsers(updatedUsers);
  };

  return (
    <>
      <div className="tag-input-container"
      style={{
        alignItems:"center"
      }}
      >
        <div
          style={{

            flexDirection: "row",
            flexWrap: "wrap",
            borderBottom: "1px solid blue",
            padding: 10,
            width: "70%",
            display: "flex",
            alignSelf:"center",
            margin:"auto"

          }}
        >
          {selectedUsers.map((user) => (
            <div key={user.username} style={{
              background: "#ccc",
              marginLeft: 10,
              flexDirection: "row",
              borderRadius: 24,
              display: "flex",
              alignItems: "center",
              margin: 5,
              padding: "0px 8px 0px 6px",
              height: 45




            }}>
              <img src={user.image} alt={user.username} className="user-image"
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 25 / 2
                }}
              />
              <p
                style={{
                  marginLeft: 3,
                  fontSize: 13
                }}
              >{user.username}</p>
              <span className="remove-icon" onClick={() => handleRemoveUser(user)}>
                X
              </span>
            </div>
          ))}
          <input
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onClick={handleInputClick}

            placeholder="Add new user"
            className="tag-input"
            style={{
              border: "0px ",
              outline: "none",
              margin: 0
            }}
          />
        </div>
      {showSuggestions && inputValue && <SuggestionModal users={unSelectedUser} inputValue={inputValue} onSelect={handleAddUser} />}
      </div>

    </>

  );
};

export default TagInput;
