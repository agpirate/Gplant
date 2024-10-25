


var  _localStorage = {
    _get: (_item) => {
      return localStorage.getItem(_item);
    },
    _set: (_key, _item) => {
      return localStorage.set(_key, _item);
    },
    _clear: (_key, _item) => {
      sessionStorage.clear();
      localStorage.clear();
      return {path:'/',name:'',query:{userid:''},params: {}};
    },
    _reroute: (_pathUrl, _pathName,deviceSmall=false) => {
      let _ismobile = deviceSmall ? [`/dboards/${_pathUrl}`,_pathName ]: [`/dboards/${_pathUrl}`,_pathName ];
      return {path:_ismobile[0],name:_ismobile[1],query:{userid:''},params: {}};
    },
  };

  /// const _localStorage2 = {
  //   _get: (_item) => {
  //     return $q.localStorage.getItem(_item);
  //   },
  //   _set: (_key, _item) => {
  //     return $q.localStorage.set(_key, _item);
  //   },
  //   _clear: (_key, _item) => {
  //     return $q.localStorage.clear();
  //   },
  // };

  export default _localStorage;