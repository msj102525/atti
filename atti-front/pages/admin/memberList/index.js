import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import { useQuery, useMutation, useQueryClient } from 'react-query';
//import { getMemberList, deleteMember, searchMember } from "../../api/member";
import { handleAxiosError } from "../../api/errorAxiosHandle";

const MemberListComponent = observer(() => {
    const [searchField, setSearchField] = React.useState("");
    const [searchInput, setSearchInput] = React.useState("");
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const queryClient = useQueryClient();
    const [isAdmin, setIsAdmin] = React.useState(false);

    const { data, isLoading } = useQuery(['memberList', { page, size, searchField }], () => getMemberList({
        searchField,
        page: page - 1,
        size: size,
    }), {
        keepPreviousData: true,
    });

    const deleteMemberMutation = useMutation(deleteMember, {
        onSuccess: () => {
            queryClient.invalidateQueries('memberList');
        },
        onError: handleAxiosError,
    });

    const handleSearchChange = (e) => setSearchInput(e.target.value);

    const executeSearch = () => setSearchField(searchInput);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            executeSearch();
        }
    };

    const handleSizeChange = (e) => setSize(e.target.value);

    useEffect(() => {
        setIsAdmin(localStorage.getItem("isAdmin") === "true");
    }, []);

    const handleDelete = (memberId) => {
        deleteMemberMutation.mutate(memberId);
    };

    if (isLoading) return <div>Loading...</div>;
    if (!data) return <div>No data</div>;

    return (
        <div className="container mt-5">
            <h2>회원 리스트</h2>
            <div style={{ height: "2vw", justifyContent: "center", textAlign: "right" }}>
                <select value={size} onChange={handleSizeChange} style={{ height: "88%" }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
                <input type="text" placeholder="아이디 검색..." value={searchInput} onChange={handleSearchChange} onKeyDown={handleKeyPress} />
                <button onClick={executeSearch}>검색</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: "5vw", textAlign: "center" }}>회원아이디</th>
                        <th style={{ textAlign: "center" }}>회원이름</th>
                        <th style={{ width: "10vw", textAlign: "center" }}>이메일</th>
                        <th style={{ width: "7vw", textAlign: "center" }}>가입일자</th>
                        <th style={{ width: "4vw", textAlign: "center" }}>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {data.members.map(member => (
                        <tr key={member.id}>
                            <td style={{ width: "5vw", textAlign: "center" }}>{member.username}</td>
                            <td style={{ textAlign: "left" }}>{member.name}</td>
                            <td style={{ width: "10vw", textAlign: "center" }}>{member.email}</td>
                            <td style={{ width: "7vw", textAlign: "center" }}>{member.joinDate}</td>
                            <td style={{ width: "4vw", textAlign: "center" }}>
                                {isAdmin && (
                                    <button onClick={() => handleDelete(member.id)}>삭제</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {/* 페이지네이션 구현 (현재 페이지: {page})*/}
                {/* 페이지네이션 로직 추가 */}
            </div>
        </div>
    );
});

export default MemberListComponent;