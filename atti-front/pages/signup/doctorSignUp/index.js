import styles from "@/styles/signUp/doctorSignUp.module.css";
import React, { useEffect, useState } from "react";
import licenseValid from "@/pages/api/doctor/licenseValid";
const User = {
  email: "test@example.com",
  pw: "test2323@@@",
};

export default function doctorSignUp() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [code, setCode] = useState("");

  const [idValid, setIdValid] = useState(true);
  const [pwValid, setPwValid] = useState(true);
  const [pw2Valid, setPw2Valid] = useState(true);
  const [notAllow, setNotAllow] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [birthDateValid, setBirthDateValid] = useState(true);
  const [codeInput, setCodeInptut] = useState(false);

  //이메일 인증관련
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  // useEffect(() => {
  //   if (emailValid && pwValid) {
  //     setNotAllow(false);
  //     return;
  //   }
  //   setNotAllow(true);
  // }, [emailValid, pwValid]);
  const handleEmailVerification = () => {
    // 랜덤 코드 생성
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    setCode(verificationCode);
    // 랜덤 코드 출력 (실제로는 이메일 전송으로 대체되어야 함)
    console.log(`Verification code sent to ${email}: ${verificationCode}`);
  };
  const validCode = (e) => {};
  const sendCode = (e) => {
    setCodeInptut(true);
    handleEmailVerification();
  };
  const handleId = (e) => {
    setId(e.target.value);
    const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,20}$/;
    if (regex.test(e.target.value)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  };
  const handlePw = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };
  const handlePw2 = (e) => {
    const value = e.target.value;
    setPw2(value);
    if (value === pw) {
      setPw2Valid(true);
    } else {
      setPw2Valid(false);
    }
  };
  const handleName = (e) => {
    const nameValue = e.target.value;
    setName(nameValue);
    if (6 > nameValue.length > 0) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };
  const handleEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    if (emailValue.includes("@kma.org")) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  const handleBirthDate = (e) => {
    const birthDateValue = e.target.value;
    setBirthDate(birthDateValue);
    const birthDate = new Date(birthDateValue);
    const nowDate = new Date();
    if (birthDateValue.length > 0 && birthDate.getTime() < nowDate.getTime()) {
      setBirthDateValid(true);
    } else {
      setBirthDateValid(false);
    }
  };
  const handleVerificationCode = (e) => {
    setVerificationCode(e.target.value);
  };
  const onClickConfirmButton = () => {
    if (email === User.email && pw === User.pw) {
      alert("로그인에 성공했습니다.");
    } else {
      alert("등록되지 않은 회원입니다.");
    }
  };

  //이메일인증
  const verifyCode = (e) => {
    // 입력된 코드와 랜덤 생성된 코드가 일치하는지 확인
    console.log(e.target.value);
    console.log(code);
    if (e.target.value == code) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  };
  return (
    <div className={styles.page}>
      <div className={styles.titleWrap}>의사 회원가입 페이지</div>
      <div className={styles.contentWrap}>
        <div className={styles.inputTitle}>아이디</div>
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            type="text"
            placeholder="아이디 입력 (4자~20자)의 영어와 숫자만 가능"
            value={id}
            onChange={handleId}
          />
        </div>
        <div className={styles.errorMessageWrap}>
          {!idValid && id.length > 0 && <div>사용할 수 없는 아이디입니다</div>}
        </div>

        <div className={styles.inputTitle}>비밀번호</div>
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            type="password"
            placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 6~20자)"
            value={pw}
            onChange={handlePw}
          />
        </div>
        <div className={styles.errorMessageWrap}>
          {!pwValid && (
            <div>문자, 숫자, 특수문자 포함 6~20자로 입력해주세요</div>
          )}
        </div>
        <div className={styles.inputTitle}>비밀번호 재입력</div>
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            type="password"
            placeholder="비밀번호 재입력"
            value={pw2}
            onChange={handlePw2}
          />
        </div>
        <div className={styles.errorMessageWrap}>
          {!pw2Valid && <div>비밀번호가 일치하지 않습니다.</div>}
        </div>
        <div className={styles.inputTitle}>이름</div>
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            type="text"
            placeholder="ex ) 홍길동"
            value={name}
            onChange={handleName}
          />
        </div>
        <div className={styles.errorMessageWrap}>
          {!nameValid && <div>올바른 이름을 입력해주세요</div>}
        </div>
        <div className={styles.inputTitle}>이메일주소</div>
        <div className={styles.licenseDiv}>
          <div className={styles.inputWrapForLicense}>
            <input
              className={styles.input}
              type="email"
              placeholder="의사협회 이메일을 입력해주세요"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className={styles.buttonDiv}>
            <button className={styles.license} onClick={sendCode}>
              확인코드 전송
            </button>
          </div>
        </div>
        <div className={styles.errorMessageWrap}>
          {!emailValid && <div>올바른 이메일을 입력해주세요</div>}
        </div>
        {codeInput && (
          <div>
            <div className={styles.inputTitle}>인증 코드</div>
            <div className={styles.licenseDiv}>
              <div className={styles.inputWrapForLicense}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="이메일로 전송온 코드를 입력해주세요!"
                  onChange={verifyCode}
                />
              </div>
              <div className={styles.buttonDiv}>
                <button className={styles.license} onClick={validCode}>
                  이메일 인증
                </button>
              </div>
            </div>
            <div className={styles.errorMessageWrap}>
              {!isVerified && <div>코드가 일치하지 않습니다!</div>}
            </div>
          </div>
        )}
        <div className={styles.inputTitle}>생년월일</div>
        <div className={styles.inputWrap}>
          <input
            className={styles.input}
            type="date"
            value={birthDate}
            onChange={handleBirthDate}
          />
        </div>
        <div className={styles.errorMessageWrap}>
          {!birthDateValid && <div>올바른 생일을 입력해주세요!</div>}
        </div>
      </div>

      <div>
        <button onClick={onClickConfirmButton} className={styles.bottomButton}>
          회원가입
        </button>
      </div>
    </div>
  );
}
