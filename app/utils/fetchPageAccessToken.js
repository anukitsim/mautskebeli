// utils/fetchPageAccessToken.js

const fetchPageAccessToken = async (userAccessToken, pageId) => {
    try {
        const response = await fetch(`http://localhost:3001/facebook-access-token-endpoint`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_access_token: userAccessToken,
                page_id: pageId,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            return data.page_access_token;
        } else {
            throw new Error(`Error fetching page access token: ${data.error.message}`);
        }
    } catch (error) {
        throw new Error(`Error fetching page access token: ${error.message}`);
    }
};

export default fetchPageAccessToken;
