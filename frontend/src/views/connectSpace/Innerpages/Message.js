import React, { useState, useEffect } from 'react';
import "../css/connectSpace.css";
import InputPopup from 'src/components/inputPopup/InputPopup';
import EditBtn from 'src/views/buttons/buttons/EditBtn';
import DeleteBtn from 'src/views/buttons/buttons/DeleteBtn';
import NewInput from 'src/components/NewInput/NewInput';
import NewButton from 'src/views/buttons/buttons/NewButton';

const Message = ({ message, currentUser, isGroup, onEdit, onDelete, showDateSeparator, dateLabel }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(message.content || '');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem("theme") || "light";
      setTheme(newTheme);
    };

    window.addEventListener("storage", handleStorageChange);

    const observer = new MutationObserver(handleStorageChange);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleEdit = () => {
    if (editedContent.trim() !== '') {
      onEdit(message.id, editedContent);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedContent(message.content || '');
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await onDelete(message.id);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  // Error handling for invalid message
  if (!message || typeof message !== 'object') {
    return <div className="message error">Invalid message</div>;
  }

  const isMine = message.sender_id === currentUser?.id;

  // Array of colors for different users in group chats
  const colorslight = [
    ' #993232',
    ' #572c69',
    ' #32817d',
    ' #2c798a',
    ' #35835e',
    ' #88763a',
    ' #943394',
    ' #132c3d',
    ' #167c16',
    ' #835529',
    ' #1e5528',
  ];

  const colorsdark = [
    '#ff9696',
    '#8ffff9',
    '#dd8eff',
    '#96ecff',
    '#9cffd1',
    '#ffe387',
    '#ff9dff',
    '#94d4ff',
    '#98ff98',
    '#ffc996',
    '#a0ffb2',
  ];

  // Function to get consistent color for a user based on their sender_id
  const getUserColor = (senderId, theme) => {
    if (!senderId) return '#043346';
    return theme === "light"
      ? colorslight[senderId % colorslight.length]
      : colorsdark[senderId % colorsdark.length];
  };

  const senderColor = getUserColor(message.sender_id, theme);

  return (
    <>
      {/* Date separator */}
      {showDateSeparator && (
        <div className="date-separator">
          <div className="date-separator-line"></div>
          <div className="date-separator-text">{dateLabel}</div>
          <div className="date-separator-line"></div>
        </div>
      )}

      <div
        className={`message ${isMine ? 'mine' : 'theirs'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Sender name for group messages */}
        {isGroup && !isMine && (
          <div
            className="sender-name"
            style={{
              fontSize: '12px',
              fontWeight: 'bold',
              marginBottom: '2px',
              opacity: 0.8,
              color: senderColor,
              transition: 'color 0.3s ease-in-out'
            }}
          >
            {message.sender_name || 'Unknown User'}
          </div>
        )}

        {/* Message content container */}
        <div className="message-content">
          {isEditing ? (
            <div className="edit-container">
              <div
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleEdit();
                  } else if (e.key === 'Escape') {
                    handleCancel();
                  }
                }}
              >
                <NewInput
                  type="text"
                  width="100%"
                  height="35px"
                  selectedValue={editedContent}
                  setSelectedValue={setEditedContent}
                  placeholder="Edit message..."
                  autoFocus
                />
              </div>
              <div className="edit-actions">
                <div onClick={handleEdit}>
                  <NewButton text="Save" value={editedContent} width="68px" />
                </div>
                <div onClick={handleCancel}>
                  <NewButton text="Cancel" width="68px" />
                </div>
              </div>
            </div>
          ) : message.deleted_at ? (
            isMine ? (
              <div className="deleted-message mine">
                <i>Message deleted</i>
              </div>
            ) : (
              <div className="deleted-message theirs">
                <i>Message deleted</i>
              </div>
            )
          ) : (
            <div className="message-text">
              {message.content || ''}
              {message.created_at && (
                <div className="message-timestamp">
                  {new Date(message.created_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action buttons below the message bubble */}
        {isMine && !message.deleted_at && (
          <div
            className="message-actions-external"
            style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginBottom: '10px',
              paddingRight: '10px',
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(-6px)',
              transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
              pointerEvents: isHovered ? 'auto' : 'none'
            }}
          >
            <div onClick={() => setIsEditing(true)} style={{ cursor: 'pointer' }}>
              <EditBtn fill="var(--page-title)" />
            </div>
            <div onClick={handleDeleteClick} style={{ cursor: 'pointer' }}>
              <DeleteBtn fill="var(--page-title)" />
            </div>
          </div>
        )}

        {/* Delete confirmation popup */}
        {showDeleteConfirm && (
          <InputPopup
            popupType="confirmation"
            title="Do you want to delete the message?"
            firstButtonText="Yes"
            secondButtonText="No"
            handleAdd={handleDeleteConfirm}
            handleSave={() => { }}
            setCurrentPopup={handleDeleteCancel}
            fields={[]}
            value=""
            setValue={() => { }}
            width={"330px"}
            position="center"
          />
        )}
      </div>
    </>
  );
};

export default Message;