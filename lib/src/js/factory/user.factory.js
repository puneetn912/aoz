// Code generator by Bharath
export default function userFactory() {
  angular.module('adminApp')
    .factory('userFactory', userFactory);

  userFactory.$inject = ['$resource'];

  function userFactory($resource) {
    return $resource('/api/users/:id', null, {
      'get': { method:'GET' },
      'save': { method:'POST' },
      'query': { method:'GET', isArray:true },
      'remove': { method:'DELETE' },
      'delete': { method:'DELETE' },
      'update': { method:'PUT' }
    });
  }
}
// End of file