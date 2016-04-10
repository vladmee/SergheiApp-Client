angular.module('starter.services', [])

.factory('ResultsService', ResultsService);

function ResultsService($q, $http) {
  var publicData = {
    get: get
  };

  function get(find, limit, offset) {
    var deferred = $q.defer();

    $http({
      'mehod': 'GET',
      'url': 'https://sergheiapp-sharebaan.c9users.io/search',
      'headers': {
              'Content-Type': 'application/json'
      },
      'params': {
        'find': find,
        'limit': limit,
        'offset': offset
      }
    }).then(function(res) {
        deferred.resolve(res);
    });

    return deferred.promise;
  };

  return publicData;
};
