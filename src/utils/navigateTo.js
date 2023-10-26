export const navigateTo = (userData) => {
    let path;
    switch (userData?.role) {
        case "admin":
        case "compensation-depart":
        case "requests-depart":
            path = "/admindashboard";
            break;
        case "company":
            path = "/companyprofile";
            break;
        case "individual":
            path = "/individualprofile";
            break;
        default:
            path = "/";
    }

    return path;
};