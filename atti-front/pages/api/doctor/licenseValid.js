import axios from "axios";

export async function fetchData(licenseData) {
  try {
    const response = await axios.post(
      "https://lic.mohw.go.kr/scrap/common/mohw/MedicalLicenseInquirySimple",
      licenseData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // 응답 데이터 반환
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // 오류 발생 시 오류를 던짐
  }
}
