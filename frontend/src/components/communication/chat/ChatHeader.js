import React from "react";
import { IconButton, makeStyles, Link } from "@material-ui/core";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import ChatTitle from "../../communication/chat/ChatTitle";
import MiniProfilePreview from "../../profile/MiniProfilePreview";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

const useStyles = makeStyles(theme => ({
  topBar: {
    textAlign: "center",
    padding: theme.spacing(1),
    background: theme.palette.grey[200],
    width: "100%",
    flex: "none"
  },
  backIcon: {
    float: "left",
    left: theme.spacing(1)
  },
  manageMembersButton: {
    float: "right",
    right: theme.spacing(1)
  },
  showParticipantsButton: {
    cursor: "pointer",
    userSelect: "none"
  }
}));

export default function ChatHeader({
  isPrivateChat,
  chatting_partner,
  title,
  toggleShowChatParticipants,
  showChatParticipants,
  className,
  canEditMembers,
  handleToggleMemberManagementExpanded,
  memberManagementExpanded
}) {
  const classes = useStyles();
  return (
    <div className={`${classes.topBar} ${className}`}>
      {!memberManagementExpanded &&
        <IconButton className={classes.backIcon} href="/inbox">
          <KeyboardArrowLeftIcon />
        </IconButton>
      }
      {!isPrivateChat && !showChatParticipants && canEditMembers && !memberManagementExpanded &&(
        <IconButton
          className={classes.manageMembersButton}
          onClick={handleToggleMemberManagementExpanded}
        >
          <GroupAddIcon />
        </IconButton>
      )}
      {isPrivateChat ? (
        <MiniProfilePreview profile={chatting_partner} />
      ) : (
        <div>
          <ChatTitle chat={{ name: title }} />
          <div>
            <Link
              underline="always"
              onClick={toggleShowChatParticipants}
              className={classes.showParticipantsButton}
            >
              {showChatParticipants ? "Hide chat participants" : "Show chat participants"}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
