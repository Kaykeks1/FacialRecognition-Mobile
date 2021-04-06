export default {
    async fetchStudentInformation(data) {
        try {
            console.log('fea', data)
            const body = new FormData();
            body.append('image', data.data);
            let response = await fetch('http://Kaykeks.pythonanywhere.com/student/get',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Accept: 'application/json'
                },
                body,
            }
             );
            let responseJson = await response.json();
            return responseJson
         } catch(error) {
             console.error("error: ", error);
             return error;
         }
    }
};