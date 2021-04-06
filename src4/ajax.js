const apiHost = 'http://bakesaleforgood.com'

export default {
    async fetchInitialDeals() {
        try {
            const response = await fetch(apiHost+'/api/deals')//(`${apiHost}/api/deals`);
            const responseJson = await response.json();
            return responseJson
         } catch(error) {
            console.log('yooo')
             console.error(error);
             return [];
         }
    },
    
    async fetchDealDetail(dealId) {
        try {
            console.log("work")
            const response = await fetch(apiHost+'/api/deals/'+dealId)//(`${apiHost}/api/deals`);
            const responseJson = await response.json();
            return responseJson
         } catch(error) {
            console.log('yooo')
             console.error(error);
             return [];
         }
    },

    async fetchSearchTerm(searchTerm) {
        try {
            console.log("work")
            const response = await fetch(apiHost+'/api/deals?searchTerm='+searchTerm)//(`${apiHost}/api/deals`);
            const responseJson = await response.json();
            return responseJson
         } catch(error) {
            console.log('yooo')
             console.error(error);
             return [];
         }
    }
};

// const x =()=> {
//     console.log("x")
// }



// export default x;

// export const y =()=> {
//     console.log("y")
// };