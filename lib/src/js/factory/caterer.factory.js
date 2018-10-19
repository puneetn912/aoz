export default function catererFactory() {
  angular.module('cmsApp')
    .factory('catererFactory', catererFactory);
  catererFactory.$inject = ['$resource'];
  function catererFactory($resource) {
    return $resource('/admin/caterer', null, {
      'get': { method:'GET', isArray:true },
    });
  }
}