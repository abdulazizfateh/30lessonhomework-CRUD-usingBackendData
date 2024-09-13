const url = "http://localhost:3000";

export const getData = async () => {
    try {
        const response = await fetch(`${url}/posts`);
        const data = await response.json();
        return data;
    } catch (error) {
        return error.message;
    }
};

export const createData = async (formData) => {
    try {
        const response = await fetch(`${url}/posts`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(formData)
        });
        const data = response.json();
        return data;
    } catch (error) {
        return error.message;
    }
}