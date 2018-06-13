app.factory('apiServices', ['$http', function ($http) {


    return {
        AuthenticateUser: function (user) {
            return $http.post("/api/v1/user/authenticate", user);
        },

        //Get the Transaction Category
        GetTransactionCategory: function () {
            var token = localStorage.getItem("userToken");
            return $http.get("/api/v1/transaction/category/get", { headers: { 'Authorization': token } });
        },

        //Payment Modes
        GetPaymentModes: function () {
            var token = localStorage.getItem("userToken");
            return $http.get("/api/v1/payment/mode/get", { headers: { 'Authorization': token } });
        },

        //Expenditure Types
        GetExpenditureType: function () {
            var token = localStorage.getItem("userToken");
            return $http.get("/api/v1/expenditure/category/get", { headers: { 'Authorization': token } });
        },

        //Add The Investment data
        AddInvestment: function (investment) {
            var token = localStorage.getItem("userToken");
            return $http.post("/api/v1/transaction/investment/save", investment, { headers: { 'Authorization': token } });
        },
        //Add The Income data
        AddIncome: function (income) {
            var token = localStorage.getItem("userToken");
            return $http.post("/api/v1/transaction/income/save", income, { headers: { 'Authorization': token } });
        },
        //Add The Expense data
        AddExpense: function (expense) {
            var token = localStorage.getItem("userToken");
            return $http.post("/api/v1/transaction/expense/save", expense, { headers: { 'Authorization': token } });
        }
    };
}]);





// Get the Local storage Service, TODO: Put it into seperate file.
app.factory('getLocalStorage', [function () {

    return {
        setAuthorizationToken: function (token) {
            if (window.localStorage && token) {
                //Local Storage to add Data  
                localStorage.setItem("userToken", token);
            }
        },
        clearAuthorizationToken: function () {
            if (window.localStorage) {
                localStorage.removeItem("userToken");
            }
        }
    };
}]);