export default function doctorSignUp() {
  return (
    <div className="page">
      <div className="titleWrap">
        이메일과 비밀번호를
        <br />
        입력해주세요.
      </div>
      <div className="contentWrap">
        <div className="inputTitle">이메일 주소</div>
        <div className="inputWrap">
          <input className="input" placeholder="test@gmail.com" />
        </div>
        <div className="errorMessageWrap">올바른 이메일을 입력해주세요.</div>
        <div className="inputTitle">비밀번호</div>
        <div className="inputWrap">
          <input
            className="input"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
          />
        </div>
        <div className="errorMessageWrap">
          영문, 숫자, 특수문자 포함 8자 이상 입력해주세요
        </div>
      </div>
      <div>
        <button>회원가입</button>
      </div>
    </div>
  );
}
