
export const formatDate = (originalDate) => {

    const date = new Date(originalDate);

    // Define the desired date format
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
}

