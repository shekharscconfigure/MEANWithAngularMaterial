app.controller("loginCtrl", ['$scope', '$rootScope', '$filter', '$location', '$mdDialog', 'apiServices', 'getLocalStorage',
    function ($scope, $rootScope, $filter, $location, $mdDialog, apiServices, getLocalStorage) {

        //***********************************   Scope Methods   *********************/
        $scope.AuthenticateMe = function () {
            $location.path("/home");
        }

        //*************************************************** Web Speech Api ******************************************************************************/

    }]);
