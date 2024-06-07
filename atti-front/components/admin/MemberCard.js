import React from 'react';
//import { observer } from "mobx-react";

const MemberCard = observer(({ member, onDelete }) => {
    return (
        <tr>
            <td style={{ width: "5vw", textAlign: "center" }}>{member.username}</td>
            <td style={{ textAlign: "left" }}>{member.name}</td>
            <td style={{ width: "10vw", textAlign: "center" }}>{member.email}</td>
            <td style={{ width: "7vw", textAlign: "center" }}>{new Date(member.joinDate).toLocaleDateString()}</td>
            <td style={{ width: "4vw", textAlign: "center" }}>
                <button onClick={() => onDelete(member.id)}>삭제</button>
            </td>
        </tr>
    );
});

export default MemberCard;