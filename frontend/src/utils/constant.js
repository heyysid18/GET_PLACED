export const USER_API_END_POINT=["http://localhost:8001/api/v1/user","https://get-placed-i1w0.onrender.com/api/v1/user"];
export const JOB_API_END_POINT=["http://localhost:8001/api/v1/job","https://get-placed-i1w0.onrender.com/api/v1/job"];
export const APPLICATION_API_END_POINT=["http://localhost:8001/api/v1/application","https://get-placed-i1w0.onrender.com/api/v1/application"];
export const COMPANY_API_END_POINT=["http://localhost:8001/api/v1/company","https://get-placed-i1w0.onrender.com/api/v1/company"];

// Helper functions to get file URLs from MongoDB
export const getProfilePhotoUrl = (userId) => {
    return userId ? `${USER_API_END_POINT}/profile-photo/${userId}` : null;
};

export const getResumeUrl = (userId) => {
    return userId ? `${USER_API_END_POINT}/resume/${userId}` : null;
};

export const getCompanyLogoUrl = (companyId) => {
    return companyId ? `${COMPANY_API_END_POINT}/logo/${companyId}` : null;
};